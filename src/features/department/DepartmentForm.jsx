import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { useCreateDepartment } from "./useCreateDepartment";
import { useEditDepartment } from "./useEditDepartment";


const DepartmentForm = ( {rowToEdit = {}, onCloseModal} ) => {

    const { id: editId, departmentName } = rowToEdit;

    const isEditSession = Boolean(editId);

    const {
        register, 
        handleSubmit, 
        formState: {errors}, 
        reset
    } = useForm({
        defaultValues: isEditSession ? { departmentName } : {}
    });

    const { createDepartmentMutation, isCreating } = useCreateDepartment();
    const { editDepartmentMutation, isEditing } = useEditDepartment();
    const isWorking = isCreating || isEditing;

    const onSubmit = (newDepartment) => {
        // console.log(data);

        if (isEditSession) {
            editDepartmentMutation(
                {
                    editId,
                    newDepartment
                },
                {
                    onSuccess: () => {
                        reset();
                        onCloseModal();
                    }
                }
            )
        } else {
            createDepartmentMutation(
                newDepartment,
                {
                    onSuccess: () => {
                        reset();
                        onCloseModal();
                    }
                }
            )
        }
    }

    return (
        <div className="form-control gap-6">

            <h3 className="font-bold text-lg">  
                {isEditSession ? 'Edit Form' : 'Create Form'} 
            </h3>

            <form 
                className="form-control gap-5" 
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="form-control gap-2">
                    <label className="label-text">Department Name</label>
                    <input 
                        {...register('departmentName', {
                            required: 'Department name is required'
                        })}
                        type="text"     
                        className="input input-bordered w-full" 
                        placeholder="Enter category name"
                        disabled={isWorking}
                    />
                    {errors?.departmentName && (
                        <span className='text-error text-sm'>
                            {errors?.departmentName.message}
                        </span>
                    )}
                </div>

                <div className="flex justify-end items-center gap-3">
                   
                    <Button 
                        btnType="cancel" 
                        onClick={onCloseModal} 
                        isWorking={isWorking}
                    />

                    <Button 
                        btnType="submit" 
                        isEditSession={isEditSession}
                        isWorking={isWorking}
                    />

                </div>

            </form>
        </div>
    )
}

export default DepartmentForm;