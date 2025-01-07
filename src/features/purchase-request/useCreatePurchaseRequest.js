import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPurchaseRequest } from "../../services/apiPurchaseRequest";
import { toast } from "sonner";


export const useCreatePurchaseRequest = () => {
    
    const queryClient = useQueryClient();

    const {mutate: createPR, isPending: isCreating} = useMutation({
        mutationFn: createPurchaseRequest, //mutation function
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['purchaseRequest']
            });
            toast.success('Successfully Added');
        },
        onError: (err) => {
            toast.error(err.message)
        }
    });


    return { createPR, isCreating };

}

