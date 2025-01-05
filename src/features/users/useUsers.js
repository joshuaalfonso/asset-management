import { useQuery } from "@tanstack/react-query"
import { getUsers } from "../../services/apiUsers"


const useUsers = () => {

    const { data: users, isLoading, error } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers
    });

    return { users, isLoading, error};

}

export default useUsers;