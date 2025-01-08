import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteCategory } from "../../services/apiCategory";
import { toast } from "sonner";



export const useDeleteCategory = () => {
    
    const queryClient = useQueryClient();

    const { mutate: deleteCategoryMutation, isPending: isDeleting } = useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['category']
            })
            toast.success('Successfully Deleted!')
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })
    
    return { deleteCategoryMutation, isDeleting };

}


