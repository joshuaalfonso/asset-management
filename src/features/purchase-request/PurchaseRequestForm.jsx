
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import useConsumables from "../Consumables/useConsumables";
import { useCreatePurchaseRequest } from "./useCreatePurchaseRequest";
import { useEditPurchaseRequest } from "./useEditPurchaseRequest";
import { useEffect } from "react";


const PurchaseRequestForm = ({rowToEdit = {}, onCloseModal}) => {

    const { consumables, isLoading: consumablesisLoading, consumablesError } = useConsumables();

    if (consumablesError) console.error(consumablesError.message || 'There was an error fetching consumables');

    const { id: editId, ...editValues} = rowToEdit;

    // if (id) = True and (!id ) = False
    const isEditSession = Boolean(editId);

    const purchaseRequestDate = isEditSession ? new Date(editValues.purchaseRequestDate).toISOString().split('T')[0] : '';

    const PRItems = editValues?.expand?.purchaseRequestItems_via_purchaseRequestId;

    const {
        register, 
        handleSubmit,
        formState: {errors}, 
        reset,
        control,
        setValue
    } = useForm({
        defaultValues: {
            ...(isEditSession ? editValues : {}),
            purchaseRequestDate: purchaseRequestDate,
            purchaseRequestItems: isEditSession ? PRItems : [{ item: '', quantity: '', unitPrice: '' }] 
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "purchaseRequestItems"
    })

    // Watching quantity, unitPrice, and totalQuantity
    const [purchaseRequestItems] = useWatch({
        control,
        name: ["purchaseRequestItems"]
    });

    useEffect(() => {
        let totalQuantity = 0;
        let totalAmount = 0;

        purchaseRequestItems.forEach((item) => {
            const quantity = parseFloat(item.quantity) || 0;
            const price = parseFloat(item.unitPrice) || 0;
            const totalItemPrice = quantity * price;

            totalQuantity += quantity;
            totalAmount += totalItemPrice;

            setValue('totalQuantity', totalQuantity);
            setValue('totalAmount', totalAmount);
        })

    }, [purchaseRequestItems, setValue])


    const { createPR, isCreating } = useCreatePurchaseRequest();

    const { editPurchaseRequest, isEditing } = useEditPurchaseRequest();

    const isWorking = isCreating || isEditing;

    const onSubmit = (data) => {
        // console.log(data);

        if (isEditSession) {

            editPurchaseRequest(
                {
                    newPurchaseRequest: {...data},
                    id: editId
                },
                {
                    onSuccess: () => {
                        reset();
                        onCloseModal?.();
                    }
                }
            )

        } else {

            createPR(
                data,
                {
                    onSuccess: () => {
                        reset();
                        onCloseModal?.();
                    }
                }
            );
            
        }


    }

    return (

        <form 
            className='form-control gap-5' 
            onSubmit={handleSubmit(onSubmit)}
        >

            <h3 className="font-bold text-lg"> { isEditSession ? 'Edit Form' : 'Create Form'} </h3>

            <div className="grid grid-cols-2 gap-4">
                <div className="form-control gap-2">
                    <label className="label-text">PR Date</label>
                    <input 
                        {...register('purchaseRequestDate', {
                            required: 'Date is required'
                        })}
                        type="date"     
                        className="input input-bordered w-full" 
                        placeholder="Enter name"
                    />
                    {errors.purchaseRequestDate && <span className='text-error text-sm'>{errors.purchaseRequestDate.message}</span>}
                </div>

                <div className="form-control gap-2">
                    <label className="label-text">PR #</label>
                    <input 
                        {...register('purchaseRequestNumber', {
                            required: 'PR # is required'
                        })}
                        type="text"     
                        className="input input-bordered w-full" 
                        placeholder="Enter PR #"
                    />
                    {errors.purchaseRequestNumber && <span className='text-error text-sm'>{errors.purchaseRequestNumber.message}</span>}
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="table ">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>

                        {fields.map((item, index) => (
                            <tr key={item.id}>
                                <td>
                                    <Controller
                                        name={`purchaseRequestItems[${index}].item`}
                                        control={control}
                                        rules={{ required: 'Item name is required' }}
                                        render={({ field, fieldState  }) => (
                                            <>
                                                <select 
                                                    {...field} 
                                                    className={`select select-bordered w-full ${fieldState?.error && 'select-error'}`}
                                                >
                                                    <option disabled value="">Pick item</option>
                                                    {!consumablesisLoading && consumables.map(consumable => (
                                                        <option key={consumable.id} value={consumable.id}>{consumable.name}</option>
                                                    ))}
                                                </select>
                                            </>
                                        )}
                                    />
                                </td>

                                <td>
                                    <Controller
                                        name={`purchaseRequestItems[${index}].quantity`}
                                        control={control}
                                        rules={{ required: 'quantity is required' }}
                                        render={({ field, fieldState }) => (
                                            <>
                                                <input 
                                                    {...field} 
                                                    type="number" 
                                                    placeholder="Enter quantity"
                                                    className={`input input-bordered w-full ${fieldState?.error && 'input-error'}`}
                                                />
                                            </>
                                        )}
                                    />
                                </td>

                                <td>
                                    <Controller
                                        name={`purchaseRequestItems[${index}].unitPrice`}
                                        control={control}
                                        rules={{ required: 'price is required' }}
                                        render={({ field, fieldState }) => (
                                            <>
                                                <input 
                                                    {...field} 
                                                    type="number" 
                                                    placeholder="Enter price"
                                                    className={`input input-bordered w-full ${fieldState?.error && 'input-error'}`}
                                                />
                                            </>
                                        )}
                                    />
                                </td>

                                <td>
                                    <button type="button" className="btn hover:bg-error hover:text-white" onClick={() => remove(index)}>
                                        <i className="fi fi-rr-trash text-xl flex"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            <div className="flex justify-start">
                <button 
                    type="button" 
                    className="btn hover:bg-primary hover:text-white" 
                    onClick={() => append({ item: '', quantity: '', unitPrice: '' })}
                >
                    <i className="fi fi-rr-plus-small flex text-2xl"></i>
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4">

                <div className="form-control gap-2">
                    <label className="label-text">Total Quantity</label>
                    <input 
                        {...register('totalQuantity')}
                        type="number"     
                        className="input input-bordered w-full" 
                        disabled={true}
                    />
                </div>

                <div className="form-control gap-2">
                    <label className="label-text">Total Amount</label>
                    <input 
                        {...register('totalAmount')}
                        type="number"     
                        className="input input-bordered w-full" 
                        disabled={true}
                    />
                </div>

            </div>

            <div className="flex justify-end gap-3">

                <button 
                    className={`btn  `} 
                    type='reset' 
                    onClick={() => onCloseModal?.()}
                    disabled={isWorking}
                > 
                    Cancel
                </button>

                <button 
                    className={`btn btn-primary text-base-300 `} 
                    type='submit' 
                    disabled={isWorking}
                >
                    {isWorking && <span className="loading loading-spinner"></span>}
                    {isEditSession ? 'Apply changes' : 'Create'}
                </button>

            </div>


        </form>

    )
}

export default PurchaseRequestForm;