import { useState } from "react";
import { url } from "../../config/pocketbase";
import CreateConsumableForm from "./CreateConsumableForm";
import useDeleteConsumable from "./useDeleteConsumable";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";



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
                    <div className="flex gap-3">


                        <Modal>
                            <Modal.Open opens='edit'>
                                <button 
                                    className="btn"
                                >
                                    Edit
                                </button>
                            </Modal.Open>

                            <Modal.Window name='edit'>
                                <CreateConsumableForm rowToEdit={row}/>
                            </Modal.Window>

                            <Modal.Open opens='delete'>
                                <button 
                                    className="btn"
                                >
                                    delete
                                </button>
                            </Modal.Open>

                            <Modal.Window name='delete'>
                                <ConfirmDelete 
                                    resourceName='consumable'
                                    name={name}
                                    disabled={isDeleting}
                                    onConfirm={() => deleteConsumable(id)}
                                />
                            </Modal.Window>
                        </Modal>


                    </div>
                </td>
            </tr>    
            

             {/* Render the form outside of the <tr> */}
             {/* {showForm && (
                <tr>
                    <td colSpan="6">
                        <CreateConsumableForm rowToEdit={row}/>
                    </td>
                </tr>
            )} */}
        </>
    )
}

export default ConsumableRow;