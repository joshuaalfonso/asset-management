import { useForm } from "react-hook-form";
import { useCreateCategory } from "./useCreateCategory";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "../../services/apiCategory";
import { toast } from "sonner";
import { useEditCategory } from "./useEditCategory";
import Button from "../../ui/Button";



const CategoryForm = ({rowToEdit = {}, onCloseModal}) => {

    const { id: editId, categoryName } = rowToEdit;

    const isEditSession = Boolean(editId);

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm({
        defaultValues: isEditSession ? {editId, categoryName} : {}
    });

    const { createCategoryMutation, isCreating } = useCreateCategory();

    const {  updateCategoryMutation, isEditing } = useEditCategory();
    

    const isWorking = isCreating || isEditing;

    const onSubmit = (data) => {
        // console.log(data);

        if (isEditSession) {
            updateCategoryMutation(
                {
                    newCategory: {categoryName},
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
            createCategoryMutation(
                data,
                {
                    onSuccess: () => {
                        reset();
                        onCloseModal?.();
                    }
                }
            )
        }

    }

    return (
        <div className="form-control gap-6">
            <h3 className="font-bold text-lg">  {isEditSession ? 'Edit Form' : 'Create Form'}  </h3>

            <form className="form-control gap-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control gap-2">
                    <label className="label-text">Category Name</label>
                    <input 
                        {...register('categoryName', {
                            required: 'Category name is required'
                        })}
                        type="text"     
                        className="input input-bordered w-full" 
                        placeholder="Enter category name"
                        disabled={isWorking}
                    />
                    {errors?.categoryName && <span className='text-error text-sm'>{errors?.categoryName.message}</span>}
                </div>

                <div className="flex justify-end items-center gap-3">
                   
                    <Button 
                        btnType="cancel" 
                        onClick={onCloseModal} 
                        isWorking={isWorking}
                    />

                    <Button 
                        btnType="submit" 
                        isWorking={isWorking} 
                        isEditSession={isEditSession}
                    />

                </div>

            </form>
        </div>
    )
}


export default CategoryForm;