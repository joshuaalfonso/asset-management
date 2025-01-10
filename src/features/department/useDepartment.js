import { useQuery } from "@tanstack/react-query";
import { getDepartment } from "../../services/apiDepartment";


export const useDepartment = () => {

    const { 
        data: department, 
        isPending, 
        error 
    } = useQuery({
    queryFn: getDepartment,
    queryKey: ['department']
});

    return { department, isPending, error };

}