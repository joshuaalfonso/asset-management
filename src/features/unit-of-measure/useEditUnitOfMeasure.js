import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createUnitOfMeasure } from "../../services/apiUnitOfMeasure";
import { toast } from "sonner";






export const useEditUnitOfMeasure = () => {
    
    const queryClient = useQueryClient();

    const { mutate: editUnitOfMeasure, isPending: isEditing } = useMutation({
        mutationFn: ({newUnitOfMeasure, id}) => createUnitOfMeasure(newUnitOfMeasure, id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['unitOfMeasure']
            });
            toast.success('Successfully Updated!');
        },
        onError: (err) => {
            console.error;
            toast.error(err.message);
        }
    })

    return { editUnitOfMeasure, isEditing };

}