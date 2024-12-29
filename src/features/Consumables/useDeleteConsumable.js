import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteConsumables as deleteConsumableApi } from "../../services/apiConsumables";
import { toast } from "sonner";


const useDeleteConsumable = () => {

    const queryClient = useQueryClient();

    const { 
        isPending: isDeleting, 
        mutate: deleteConsumable
    } = useMutation({
        mutationFn: deleteConsumableApi,
        onSuccess: () => {
            
            queryClient.invalidateQueries({
                queryKey: ['consumables']
            });

            toast.success('Successfully deleted')
        }, 
        onError: (err) => {
            toast.error(err.message)
        }
    });

    return {isDeleting, deleteConsumable}
    
}

export default useDeleteConsumable;