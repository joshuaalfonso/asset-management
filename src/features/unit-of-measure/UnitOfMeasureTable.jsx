
import { useQuery } from "@tanstack/react-query";
import { getUnitOfMeasure } from "../../services/apiUnitOfMeasure";
import { UnitOfMeasureRow } from "./UnitOfMeasureRow";


export const UnitOfMeasureTable = () => {

    const { 
        data: unitOfMeasure, 
        isLoading, 
        error
    } = useQuery({
        queryKey: ['unitOfMeasure'],
        queryFn: getUnitOfMeasure,
    });

    if (isLoading) return <div>Loading...</div>;

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