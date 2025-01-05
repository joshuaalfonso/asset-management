
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";




const PurchaseRequestForm = ({rowToEdit = {}, onCloseModal}) => {

    const {
        register, 
        handleSubmit,
        formState: {errors}, 
        reset,
        control
    } = useForm({
        defaultValues: {
            purchaseOrderItems: [{ itemName: '', quantity: '', price: '' }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "purchaseOrderItems"
    })

    const onSubmit = (data) => {
        console.log(data);
    }

    const [value, setValue] = useState({ 
        startDate: null, 
        endDate: null
    });


    return (

        <form 
            className='form-control gap-5' 
            onSubmit={handleSubmit(onSubmit)}
        >

            <h3 className="font-bold text-lg"> { 'Create Form'} </h3>

            <div className="form-control gap-2">
                <label className="label-text">PR #</label>
                <input 
                    {...register('name', {
                        required: 'Name is required'
                    })}
                    type="text"     
                    className="input input-bordered w-full" 
                    placeholder="Enter name"
                />
                {errors.name && <span className='text-error text-sm'>{errors.name.message}</span>}
            </div>


            <div className="form-control gap-2">
                <label className="label-text">PR Date</label>
                <input 
                    {...register('date', {
                        required: 'Date is required'
                    })}
                    type="date"     
                    className="input input-bordered w-full" 
                    placeholder="Enter name"
                />
                {errors.date && <span className='text-error text-sm'>{errors.date.message}</span>}
            </div>

            {fields.map((item, index) => (
                <div key={item.id}>
                    <div>
                        <label>Item Name</label>
                        <Controller
                            name={`purchaseOrderItems[${index}].itemName`}
                            control={control}
                            render={({ field }) => <input {...field} />}
                        />
                    </div>

                    <div>
                        <label>Quantity</label>
                        <Controller
                            name={`purchaseOrderItems[${index}].quantity`}
                            control={control}
                            render={({ field }) => <input {...field} type="number" />}
                        />
                    </div>

                    <div>
                        <label>Price</label>
                        <Controller
                            name={`purchaseOrderItems[${index}].price`}
                            control={control}
                            render={({ field }) => <input {...field} type="number" />}
                        />
                    </div>

                    <button type="button" onClick={() => remove(index)}>
                        Remove Item
                    </button>
                </div>
            ))}

            <button type="button" onClick={() => append({ itemName: '', quantity: '', price: '' })}>
                Add Item
            </button>


            <div className="flex justify-end gap-2">

                <button 
                    className={`btn  `} 
                    type='reset' 
                    onClick={() => onCloseModal?.()}
                >Cancel</button>

                <button 
                    className={`btn btn-primary text-base-300 `} 
                    type='submit' 
                >
                         Submit
                </button>

            </div>


        </form>

    )
}

export default PurchaseRequestForm;