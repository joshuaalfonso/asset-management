import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "../../services/apiCategory";
import { toast } from "sonner";



export const useEditCategory = () => {


    const queryClient = useQueryClient();
    const {mutate: updateCategoryMutation, isPending: isEditing} = useMutation({
        mutationFn: ({newCategory, id}) => createCategory(newCategory, id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['category']
            });
            toast.success('Successfully Edited!');
        },
        onError: (err) => {
            console.log(err);
            toast.error(err.message)
        }
    })

    return { updateCategoryMutation, isEditing };

}