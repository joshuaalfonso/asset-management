import { useQuery } from "@tanstack/react-query";
import { getUnitOfMeasure } from "../../services/apiUnitOfMeasure";



export const useUnitOfMeasure = () => {

    const { 
        data: unitOfMeasure, 
        isLoading, 
        error
    } = useQuery({
        queryKey: ['unitOfMeasure'],
        queryFn: getUnitOfMeasure,
    });

    return { unitOfMeasure, isLoading, error };

}