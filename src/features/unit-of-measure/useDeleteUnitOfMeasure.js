import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteUnitOfMeasure } from "../../services/apiUnitOfMeasure";
import { toast } from "sonner";



export const useDeleteUnitOfMeasure = () => {

    const queryClient = useQueryClient();

    const {mutate: deleteUoM, isPending: isDeleting} = useMutation({
        mutationFn: deleteUnitOfMeasure,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['unitOfMeasure']
            })
            toast.success('Successfully Deleted!')
        }, 
        onError: (err) => {
            toast.error(err.message);
        }
    })

    return {  deleteUoM, isDeleting };

}