import { AlertMessage } from "../../ui/AlertMessage";
import { LoaderSpinner } from "../../ui/LoadingSpinner";
import { DepartmentRow } from "./DepartmentRow";
import { useDepartment } from "./useDepartment";




const DepartmentTable = () => {


    const { department, isPending, error } = useDepartment(); 

    if (isPending) return <LoaderSpinner />;

    if (error) return <AlertMessage message={error.message}/>


    return (
        <>
            
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 1 */}
                    {department.map((row, index) => (
                        <DepartmentRow row={row} index={index} key={row.id}/>
                    ))}

                    </tbody>
                </table>
            </div>

        </>
    )
}

export default DepartmentTable;