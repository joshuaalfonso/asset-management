import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditDepartment } from "../../services/apiDepartment";
import { toast } from "sonner";


export const useEditDepartment = () => {
    
    const queryClient = useQueryClient();

    const {
        mutate: editDepartmentMutation,
        isPending: isEditing
    } = useMutation({
        mutationFn: ({newDepartment, editId}) => createEditDepartment(newDepartment, editId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['department']
            })
            toast.success('Successfully Created');
        },
        onError: (err) => {
            toast.error(err.message || 'Unknown error occured while creating department')
        }
    })

    return { editDepartmentMutation, isEditing };

}

