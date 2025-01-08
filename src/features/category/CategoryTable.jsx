import { AlertMessage } from "../../ui/AlertMessage";
import { LoaderSpinner } from "../../ui/LoadingSpinner";
import CategoryRow from "./CategoryRow";
import { useCategory } from "./useCategory";




const CategoryTable = () => {

    const { category, isLoading, error } = useCategory();

    if (isLoading) return <LoaderSpinner />;
    if (error) return <AlertMessage message={error.message}/>

    return (
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
                {category.map((row, index) => (
                    <CategoryRow row={row} index={index} key={row.id}/>
                ))}

                </tbody>
            </table>
        </div>
    )
}


export default CategoryTable;