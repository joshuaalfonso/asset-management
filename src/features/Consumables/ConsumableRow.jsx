import { useState } from "react";
import { url } from "../../config/pocketbase";
import CreateConsumableForm from "./CreateConsumableForm";
import useDeleteConsumable from "./useDeleteConsumable";



const ConsumableRow = ({row, index}) => {

    const { id, collectionId, image, name, type} = row;

    const [showForm, setShowForm] = useState(false);

    const fileUrl = `${url}api/`;

    const {isDeleting, deleteConsumable} = useDeleteConsumable();

    return (
        <>
            <tr>
                <th>{index + 1}</th>
                <td>
                    <img src={`${fileUrl}files/${collectionId}/${id}/${image}`} width={50}/>
                </td>
                <td>{name}</td>
                <td>{type}</td>
                <td>{row.expand?.assigned_to?.name}</td>
                <td>
                    <button 
                        className="btn"
                        onClick={() => deleteConsumable(id)} 
                        disabled={isDeleting}
                    >
                        delete
                    </button>
                    <button 
                        className="btn"
                        onClick={() => setShowForm((show) => !show)}
                    >
                        Edit
                    </button>
                </td>
            </tr>    
            

             {/* Render the form outside of the <tr> */}
             {showForm && (
                <tr>
                    <td colSpan="6">
                        <CreateConsumableForm rowToEdit={row}/>
                    </td>
                </tr>
            )}
        </>
    )
}

export default ConsumableRow;