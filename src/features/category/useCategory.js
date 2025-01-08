import { useQuery } from "@tanstack/react-query"
import { getCategory } from "../../services/apiCategory";


export const useCategory = () => {

    const { 
        data: category, 
        isLoading, 
        error
    } = useQuery({
        queryFn: getCategory,
        queryKey: ['category']
    });

    return { category, isLoading, error };

}