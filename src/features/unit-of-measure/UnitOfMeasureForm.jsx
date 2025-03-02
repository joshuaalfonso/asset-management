
import { useForm } from "react-hook-form"
import { useCreateUnitOfMeasure } from "./useCreateUnitOfMeasure";
import { useEditUnitOfMeasure } from "./useEditUnitOfMeasure";
import Button from "../../ui/Button";


export const UnitOfMeasureForm = ({rowToEdit = {}, onCloseModal}) => {

    const {id: editId, ...editValues} = rowToEdit;

    const isEditSession = Boolean(editId);

    const {
        register, 
        formState: {errors}, 
        handleSubmit,
        reset
    } = useForm({
        defaultValues: isEditSession ? editValues : {},
    });
    
    const { newUnitOfMeasure, isCreating } = useCreateUnitOfMeasure();
    const { editUnitOfMeasure, isEditing } = useEditUnitOfMeasure();
    const isWorking = isCreating || isEditing;

    const onSubmit = (data) => {
        // console.log(data)

        if (isEditSession) {
            editUnitOfMeasure(
                {
                    newUnitOfMeasure: data,
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
            newUnitOfMeasure(
                data,
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
        <div className="form-control gap-6">
            <h3 className="font-bold text-lg"> {isEditSession ? 'Edit Form' : 'Create Form'}  </h3>

            <form className="form-control gap-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control gap-2">
                    <label className="label-text">Code</label>
                    <input 
                        {...register('uomCode', {
                            required: 'Code is required'
                        })}
                        type="text"     
                        className="input input-bordered w-full" 
                        placeholder="Enter code"
                        disabled={isWorking}
                    />
                    {errors?.uomCode && <span className='text-error text-sm'>{errors?.uomCode.message}</span>}
                </div>

                <div className="form-control gap-2">
                    <label className="label-text">Name</label>
                    <input 
                        {...register('uomName', {
                            required: 'Name is required'
                        })}
                        type="text"     
                        className="input input-bordered w-full" 
                        placeholder="Enter name"
                        disabled={isWorking}
                    />
                    {errors?.uomName && <span className='text-error text-sm'>{errors?.uomName.message}</span>}
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