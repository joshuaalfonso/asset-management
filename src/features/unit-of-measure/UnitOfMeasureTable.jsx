import { UnitOfMeasureRow } from "./UnitOfMeasureRow";
import { LoaderSpinner } from "../../ui/LoadingSpinner";
import { AlertMessage } from "../../ui/AlertMessage";
import { useUnitOfMeasure } from "./useUnitOfMeasure";


export const UnitOfMeasureTable = () => {

    
    const { unitOfMeasure, isLoading, error } = useUnitOfMeasure();

    if (isLoading) return <LoaderSpinner />;

    if (error) return <AlertMessage message={error.message} />

    return (

        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Code</th>
                        <th>Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    {unitOfMeasure.map((row, index) => (
                        <UnitOfMeasureRow row={row} index={index} key={row.id}/>
                    ))}

                </tbody>
            
            </table>

        </div>
    )
}