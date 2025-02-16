import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditDepartment } from "../../services/apiDepartment";
import { toast } from "sonner";


export const useCreateDepartment = () => {
    
    const queryClient = useQueryClient();

    const {
        mutate: createDepartmentMutation,
        isPending: isCreating
    } = useMutation({
        mutationFn: createEditDepartment,
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

    return { createDepartmentMutation, isCreating };

}