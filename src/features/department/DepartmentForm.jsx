import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../../ui/Button";
import { createDepartment } from "../../services/apiDepartment";
import { toast } from "sonner";
import { useForm } from "react-hook-form";


const DepartmentForm = ( {rowToEdit = {}, onCloseModal} ) => {

    const { id: editId, departmentName } = rowToEdit;

    const isEditSession = Boolean(editId);


    const queryClient = useQueryClient();


    const {register, handleSubmit, formState: errors, reset} = useForm();

    const {
        mutate: createDepartmentMutation,
        isPending: isCreating
    } = useMutation({
        mutationFn: createDepartment,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['department']
            })
            toast.success('Successfully Created');
        }
    })


    const onSubmit = (data) => {
        // console.log(data);

        createDepartmentMutation(
            data,
            {
                onSuccess: () => {
                    reset();
                    onCloseModal();
                }
            }
        )
    }

    return (
        <div className="form-control gap-6">
            <h3 className="font-bold text-lg">  {isEditSession ? 'Edit Form' : 'Create Form'}  </h3>

            <form className="form-control gap-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control gap-2">
                    <label className="label-text">Department Name</label>
                    <input 
                        {...register('departmentName', {
                            required: 'Department name is required'
                        })}
                        type="text"     
                        className="input input-bordered w-full" 
                        placeholder="Enter category name"
                    />
                    {errors?.departmentName && <span className='text-error text-sm'>{errors?.departmentName.message}</span>}
                </div>

                <div className="flex justify-end items-center gap-3">
                   
                    <Button 
                        btnType="cancel" 
                        onClick={onCloseModal} 
                    />

                    <Button 
                        btnType="submit" 
                        isEditSession={isEditSession}
                    />

                </div>

            </form>
        </div>
    )
}

export default DepartmentForm;