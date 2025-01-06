
import { Controller, useFieldArray, useForm } from "react-hook-form";
import useConsumables from "../Consumables/useConsumables";
import { useCreatePurchaseRequest } from "./useCreatePurchaseRequest";


const PurchaseRequestForm = ({rowToEdit = {}, onCloseModal}) => {

    const { consumables, isLoading: consumablesisLoading, consumablesError } = useConsumables();

    if (consumablesError) console.error(consumablesError.message || 'There was an error fetching consumables');

    const { id: editId, ...editValues} = rowToEdit;

    // if (id) = True and (!id ) = False
    const isEditSession = Boolean(editId);

    const purchaseRequestDate = isEditSession ? new Date(editValues.purchaseRequestDate).toISOString().split('T')[0] : '';

    const purchaseRequestItems = editValues?.expand?.purchaseRequestItems_via_purchaseRequestId;

    const {
        register, 
        handleSubmit,
        formState: {errors}, 
        reset,
        control
    } = useForm({
        defaultValues: {
            ...(isEditSession ? editValues : {}),
            purchaseRequestDate: purchaseRequestDate,
            purchaseRequestItems: isEditSession ? purchaseRequestItems : [{ item: '', quantity: '', unitPrice: '' }] 
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "purchaseRequestItems"
    })

    const { createPR, isCreating } = useCreatePurchaseRequest();

    const onSubmit = (data) => {
        // console.log(data);

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


    return (

        <form 
            className='form-control gap-5' 
            onSubmit={handleSubmit(onSubmit)}
        >

            <h3 className="font-bold text-lg"> { 'Create Form'} </h3>

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
                                                    className={`input input-bordered w-full ${fieldState?.error && 'input-error'}`}
                                                />
                                            </>
                                        )}
                                    />
                                </td>

                                <td>
                                    <button type="button" className="btn" onClick={() => remove(index)}>
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
                    className="btn btn-ghost" 
                    onClick={() => append({ item: '', quantity: '', unitPrice: '' })}
                >
                    Add Item
                </button>
            </div>


            <div className="flex justify-end gap-2">

                <button 
                    className={`btn  `} 
                    type='reset' 
                    onClick={() => onCloseModal?.()}
                    disabled={isCreating}
                > 
                    Cancel
                </button>

                <button 
                    className={`btn btn-primary text-base-300 `} 
                    type='submit' 
                    disabled={isCreating}
                >
                         Submit
                </button>

            </div>


        </form>

    )
}

export default PurchaseRequestForm;