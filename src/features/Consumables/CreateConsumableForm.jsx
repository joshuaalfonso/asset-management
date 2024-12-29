import { useForm } from "react-hook-form";
import useCreateConsumable from "./useCreateConsumable";
import useEditConsumable from "./useEditConsumable";


// empty object default value
const CreateConsumableForm = ({ rowToEdit = {} }) => {

    const { id: editId, ...editValues} = rowToEdit;

    // if (id) = True and (!id ) = False
    const isEditSession = Boolean(editId);

    // destructure state and function from useForm
    const { 
        register, 
        handleSubmit, 
        formState: {errors}, reset
    } = useForm({
        defaultValues: isEditSession ? editValues : {},
    });

    const { isCreating, createConsumable } = useCreateConsumable();

    const { isEditing, editConsumable } = useEditConsumable();

    const isWorking = isCreating || isEditing;

    const onSubmit = (data) => {

        const image = typeof data.image === 'string' ? data.image : data.image[0];
        
        if (isEditSession) {
            editConsumable(
                {
                    newConsumable: {...data, image}, 
                    id: editId
                },
                {
                    onSuccess: () => reset()
                }
            )
        }
        else {
            createConsumable(
                {
                    ...data, 
                    image: image
                },
                {
                    onSuccess: () => reset()
                }
            );
        }
    }


    return (
        <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>

            <input 
                {...register('name', {
                    required: 'Name is required'
                })}
                type="text"     
                placeholder="Enter name" 
                className="input input-bordered w-full max-w-xs" 
            />
            {errors.name && <div className='text-red-500 text-sm'>{errors.name.message}</div>}

            <input 
                {...register('type', {
                    required: 'Type is required'
                })}
                type="text" 
                placeholder="Enter type" 
                className="input input-bordered w-full max-w-xs" 
            />
            {errors.type && <div className='text-red-500 text-sm'>{errors.type.message}</div>}

            <input 
                {...register('image', {
                    required: isEditSession ? false : true
                })}
                type="file"     
                accept='image/*'
                placeholder="Enter image" 
                className="file-input w-full max-w-xs"
            />
            {errors.image && <div className='text-red-500 text-sm'>{errors.image.message}</div>}

            <input 
                {...register('assigned_to')}
                type="text"     
                placeholder="Enter assigned to" 
                className="input input-bordered w-full max-w-xs" 
            />
            {errors.assigned_to && <div className='text-red-500 text-sm'>{errors.assigned_to.message}</div>}

            <button 
                className="btn" 
                type='submit' 
                disabled={isWorking}>{isEditSession ? 'Apply changes' : 'Submit'}
            </button>

        </form>
    )
}


export default CreateConsumableForm;