
import { AlertMessage } from "../../ui/AlertMessage";
import { LoaderSpinner } from "../../ui/LoadingSpinner";
import ConsumableRow from "./ConsumableRow";
import useConsumables from "./useConsumables";

const ConsumablesTable = () => {

    const { consumables, isLoading, error } = useConsumables();

    if (isLoading) return <LoaderSpinner />;

    if (error) return <AlertMessage message={error.message} />

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>UoM</th>
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

