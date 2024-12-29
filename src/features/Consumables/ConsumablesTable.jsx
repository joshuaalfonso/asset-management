import { url } from "../../config/pocketbase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteConsumables, useGetAsset } from "../../services/apiConsumables";
import { toast } from 'sonner'

const ConsumablesTable = () => {

    const { 
        data: consumables, 
        isLoading, 
        error
    } = useQuery({
        queryKey: ['consumables'],
        queryFn: useGetAsset,
    });

    const queryClient = useQueryClient();

    const { 
        isPending: isDeleting, 
        mutate 
    } = useMutation({
        mutationFn: deleteConsumables,
        onSuccess: () => {
            
            queryClient.invalidateQueries({
                queryKey: ['consumables']
            });

            toast.success('Successfully deleted')
        }, 
        onError: (err) => {
            toast.error(err.message)
        }
    });

    if (isLoading) return <span className="loading loading-spinner text-primary"></span>;

    if (error) return <div>{error.message || 'Failed to load consumables'}</div>;

    const fileUrl = `${url}api/`;

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th></th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Assigned To</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>

                {consumables.map((item, index) => (
                    <tr key={item.id}>
                        <th>{index + 1}</th>
                        <td>
                            <img src={`${fileUrl}files/${item.collectionId}/${item.id}/${item.image}`} width={50}/>
                        </td>
                        <td>{item.name}</td>
                        <td>{item.type}</td>
                        <td>{item.expand?.assigned_to?.name}</td>
                        <td>
                            <button 
                                className="btn"
                                onClick={() => mutate(item.id)} 
                                disabled={isDeleting}
                            >
                                delete
                            </button>
                            </td>
                    </tr>
                ))}

                </tbody>
            </table>
        </div>
    )
}

export default ConsumablesTable