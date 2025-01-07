import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUnitOfMeasure } from "../../services/apiUnitOfMeasure";
import { toast } from "sonner";


export const useCreateUnitOfMeasure = () => {

    const queryClient = useQueryClient();

    const {mutate: newUnitOfMeasure, isPending: isCreating} = useMutation({
        mutationFn: createUnitOfMeasure,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['unitOfMeasure']
            });
            toast.success('Successfully Added');
        },
        onError: (err) => {
            toast.error(err);
        }
    });

    return { newUnitOfMeasure, isCreating };

}