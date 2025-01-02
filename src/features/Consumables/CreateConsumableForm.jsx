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

    // get users list
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
            className='form-control gap-5' 
            onSubmit={handleSubmit(onSubmit)}
        >

            <h3 className="font-bold text-lg"> {isEditSession ? 'Edit Form' : 'Create Form'} </h3>

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

            <div className="form-control gap-2">
                <label className="label-text">Type</label>

                <input 
                    {...register('type', {
                        required: 'Type is required'
                    })}
                    className="input input-bordered w-full" 
                    placeholder="Enter type"
                />
                {errors.type && <div className='text-error text-sm'>{errors.type.message}</div>}
            </div>

            <div className="form-control gap-2">
                <label className="label-text">Image</label>

                <input 
                    {...register('image', {
                        required: isEditSession ? false : 'Image is required'
                    })}
                    type="file"     
                    accept='image/*'
                    className="file-input file-input-bordered w-full"
                />
                {errors.image && <div className='text-error text-sm'>{errors.image.message}</div>}
            </div>

            <div className="form-control gap-2">
                <label className="label-text">Assigned to</label>
                <select 
                    className="select select-bordered w-full "
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
                {errors.assigned_to && <div className='text-error text-sm'>{errors.assigned_to.message}</div>} 
            </div>


            <div className="flex justify-end gap-2">

                <button 
                    className={`btn  `} 
                    type='reset' 
                    disabled={isWorking}
                    onClick={() => onCloseModal?.()}
                >Cancel</button>

                <button 
                    className={`btn btn-primary text-base-300 ${isWorking && 'cursor-not-allowed'}`} 
                    type='submit' 
                    disabled={isWorking}
                >
                        {isWorking && <span className="loading loading-spinner"></span>}
                        {isEditSession ? 'Apply changes' : 'Submit'}
                </button>

            </div>


        </form>
    )
}


export default CreateConsumableForm;