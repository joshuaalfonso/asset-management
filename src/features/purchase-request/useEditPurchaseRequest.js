

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePurchaseRequest } from "../../services/apiPurchaseRequest";
import { toast } from "sonner";


export const useEditPurchaseRequest = () => {

    const queryClient = useQueryClient();

    const {mutate: editPurchaseRequest, isPending: isEditing} = useMutation({
        mutationFn: ({newPurchaseRequest, id}) => updatePurchaseRequest(newPurchaseRequest, id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['purchaseRequest']
            });
            toast.success('Successfully uodated');
        },
        onError: (err) => {
            toast.error(err.message);
        }
    })

    return { editPurchaseRequest, isEditing };

}