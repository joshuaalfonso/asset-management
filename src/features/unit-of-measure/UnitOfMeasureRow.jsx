import ConfirmDelete from "../../ui/ConfirmDelete"
import Modal from "../../ui/Modal"
import { UnitOfMeasureForm } from "./UnitOfMeasureForm"
import { useDeleteUnitOfMeasure } from "./useDeleteUnitOfMeasure"



export const UnitOfMeasureRow = ({ row, index }) => {

    const { deleteUoM, isDeleting } = useDeleteUnitOfMeasure();

    return (
        <tr>
            <td> {index + 1} </td>
            <td>{row.code}</td>
            <td>{row.name}</td>
            <td>
                
                <div className="flex items-center gap-3">
                    <Modal>

                        <Modal.Open opens='edit-consumable'>
                            <button className="btn">Edit</button>
                        </Modal.Open>

                        <Modal.Window name='edit-consumable'>
                            <UnitOfMeasureForm rowToEdit={row}/>
                        </Modal.Window>

                        <Modal.Open opens='delete-consumable'>
                            <button className="btn">Delete</button>
                        </Modal.Open>

                        <Modal.Window name='delete-consumable'>
                            <ConfirmDelete 
                                name={row.name}
                                disabled={isDeleting}
                                onConfirm={() => deleteUoM(row.id)}
                            />
                        </Modal.Window>

                    </Modal>
                </div>

            </td>
        </tr>
    )
}