import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditConsumable } from "../../services/apiConsumables";
import { toast } from "sonner";





const useEditConsumable = () => {

    const queryClient = useQueryClient();

    const {mutate: editConsumable, isPending: isEditing} = useMutation({
        mutationFn: ({newConsumable, id}) => createEditConsumable(newConsumable, id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['consumables']
            });
            toast.success('Successfully updated');
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })

    return { isEditing, editConsumable }

}

export default useEditConsumable;
