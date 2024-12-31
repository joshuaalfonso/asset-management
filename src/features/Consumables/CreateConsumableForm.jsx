import { useForm } from "react-hook-form";
import useCreateConsumable from "./useCreateConsumable";
import useEditConsumable from "./useEditConsumable";
import useUsers from "../users/useUsers";
import { toast } from "sonner";


// empty object default value
const CreateConsumableForm = ({ rowToEdit = {}, onCloseModal }) => { 

    const { id: editId, ...editValues} = rowToEdit;

    // if (id) = True and (!id ) = False
    const isEditSession = Boolean(editId);

    const { users, isLoading: isLoadingUsers, error: usersError} = useUsers();

    if (usersError) toast(usersError || 'Failed to load users');

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
        // console.log(data);

        const image = typeof data.image === 'string' ? data.image : data.image[0];
        
        if (isEditSession) {
            editConsumable(
                {
                    newConsumable: {...data, image}, 
                    id: editId
                },
                {
                    onSuccess: () => {
                        reset();
                        onCloseModal?.();
                    }
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
            className='flex flex-col gap-4' 
            onSubmit={handleSubmit(onSubmit)}
        >

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
                    required: isEditSession ? false : 'Image is required'
                })}
                type="file"     
                accept='image/*'
                placeholder="Enter image" 
                className="file-input file-input-bordered w-full max-w-xs"
            />
            {errors.image && <div className='text-red-500 text-sm'>{errors.image.message}</div>}

            <select 
                className="select select-bordered w-full max-w-xs"
                defaultValue={isEditSession ? rowToEdit.assigned_to : ''}
                {...register('assigned_to', {
                    required: 'Assigned to is required'
                })}
            >
                <option disabled value="">Pick assigned to</option>
                {!isLoadingUsers && users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                ))}
            </select>
            {errors.assigned_to && <div className='text-red-500 text-sm'>{errors.assigned_to.message}</div>} 


            <div className="flex justify-end gap-2">

                <button 
                    className="btn text-white" 
                    type='reset' 
                    onClick={() => onCloseModal?.()}
                >Cancel</button>

                <button 
                    className="btn btn-primary text-white" 
                    type='submit' 
                    disabled={isWorking}>{isEditSession ? 'Apply changes' : 'Submit'}
                </button>

            </div>


        </form>
    )
}


export default CreateConsumableForm;