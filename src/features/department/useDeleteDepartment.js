import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteDepartment } from "../../services/apiDepartment";
import { toast } from "sonner";


export const useDeleteDepartment = () => {

    const queryClient = useQueryClient();

    const {
        mutate: deleteDepartmentMutation,
        isPending: isDeleting
    } = useMutation({
        mutationFn: deleteDepartment,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['department']
            });
            toast.success('Successfully Deleted!')
        },
        onError: (err) => {
            toast.error(err.message || 'An error occured while deleting department')
        }
    });


    return { deleteDepartmentMutation, isDeleting };

}