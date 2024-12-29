
import ConsumableRow from "./ConsumableRow";
import useConsumables from "./useConsumables";

const ConsumablesTable = () => {

    const { consumables, isLoading, error } = useConsumables();

    if (isLoading) return <span className="loading loading-spinner text-primary"></span>;

    if (error) return <div>{error.message || 'Failed to load consumables'}</div>;

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

                {consumables.map((row, index) => (
                       <ConsumableRow 
                            row={row} 
                            key={row.id} 
                            index={index} 
                        />
                ))}

                </tbody>
                
            </table>
        </div>
    )
}

export default ConsumablesTable