
import { useState } from "react";
import { useForm } from "react-hook-form";




const PurchaseRequestForm = ({rowToEdit = {}, onCloseModal}) => {

    const {
        register, 
        handleSubmit,
        formState: {errors}, 
        reset
    } = useForm();

    const onSubmit = () => {

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
                <label className="label-text">Name</label>
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