



import { useQuery } from "@tanstack/react-query";
import { getPurchaseRequest } from "../../services/apiPurchaseRequest";


const usePurchaseRequest = () => {

    const { 
        data: purchaseRequest, 
        isLoading, 
        error
    } = useQuery({
        queryKey: ['purchaseRequest'],
        queryFn: getPurchaseRequest,
    });

    return { purchaseRequest, isLoading, error }
    
}

export default usePurchaseRequest;