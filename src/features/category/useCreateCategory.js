import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "../../services/apiCategory";
import { toast } from "sonner";





export const useCreateCategory = () => {

    const queryClient = useQueryClient();

    const { 
        mutate: createCategoryMutation, 
        isPending: isCreating 
    } = useMutation({
        mutationFn: createCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['category']
            })
            toast.success('Successfully Created!');
        },
        onError: (err) => {
            toast.error(err.message);
        }
    })
    
    return { createCategoryMutation, isCreating };

}