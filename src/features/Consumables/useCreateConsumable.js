import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditConsumable } from "../../services/apiConsumables";
import { toast } from "sonner";


const useCreateConsumable = () => {


    const queryClient = useQueryClient();

    const {mutate: createConsumable, isPending: isCreating} = useMutation({
        mutationFn: createEditConsumable, //mutation function
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['consumables']
            });
            toast.success('Successfully Added');
        },
        onError: (err) => {
            toast.error(err.message)
        }
    });


    return { createConsumable, isCreating}

}

export default useCreateConsumable;