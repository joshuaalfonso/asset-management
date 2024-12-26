
import { useForm } from 'react-hook-form';
import ConsumablesTable from '../features/Consumables/ConsumablesTable'
import useCreateConsumables from '../services/useCreateConsumables';

function Consumables() {

    const { register, handleSubmit, formState: {errors, isSubmitting}} = useForm();

    const {addConsumables} = useCreateConsumables();

    const onSubmit = async(data) => {

        try {
            const response = await addConsumables(data);
            console.log(response);
        } catch (error) {
            console.error(error);
        }

    }

    return (
        <>
        <div>Consumables</div>

        <ConsumablesTable />

        <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
            <input 
                {...register('name', {
                    required: 'Name is required'
                })}
                type="text"     
                placeholder="Enter name" 
                className="input input-bordered w-full max-w-xs" 
            />
            {errors.name && <div className='text-red-500'>{errors.name.message}</div>}

            <input 
                {...register('type', {
                    required: 'Type is required'
                })}
                type="text" 
                placeholder="Enter type" 
                className="input input-bordered w-full max-w-xs" 
            />
            {errors.type && <div className='text-red-500'>{errors.type.message}</div>}

            <input 
                {...register('image')}
                type="text"     
                placeholder="Enter image" 
                className="input input-bordered w-full max-w-xs" 
            />
            {errors.image && <div className='text-red-500'>{errors.image.message}</div>}

            <input 
                {...register('assigned_to')}
                type="text"     
                placeholder="Enter assigned to" 
                className="input input-bordered w-full max-w-xs" 
            />
            {errors.assigned_to && <div className='text-red-500'>{errors.assigned_to.message}</div>}

            <button className="btn" type='submit' disabled={isSubmitting}>Button</button>
        </form>

        </>

    )
}

export default Consumables