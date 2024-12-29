import { useQuery } from "@tanstack/react-query";
import { useGetAsset } from "../../services/apiConsumables";




const useConsumables = () => {

    const { 
        data: consumables, 
        isLoading, 
        error
    } = useQuery({
        queryKey: ['consumables'],
        queryFn: useGetAsset,
    });

    return { consumables, isLoading, error }
    
}

export default useConsumables;