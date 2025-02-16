import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal"
import DepartmentForm from "./DepartmentForm"
import { useDeleteDepartment } from "./useDeleteDepartment"


export const DepartmentRow = ({row, index}) => {

    const { deleteDepartmentMutation, isDeleting } = useDeleteDepartment();

    return (
        <>
            <tr key={row.id}>
                <td>{index + 1}</td>
                <td>{row.departmentName}</td>
                <td>
                    
                    <div className="flex gap-3 items-center">
                        
                        
                        <Modal>
                            <Modal.Open opens='edit-department'>
                                <button className="btn ">Edit</button>
                            </Modal.Open>

                            <Modal.Window name='edit-department'>
                                <DepartmentForm rowToEdit={row}/>
                            </Modal.Window>

                            <Modal.Open opens='delete-department'>
                                <button className="btn ">Delete</button>
                            </Modal.Open>

                            <Modal.Window name='delete-department'>
                               <ConfirmDelete 
                                    name={row.departmentName} 
                                    disabled={isDeleting} 
                                    onConfirm={() => deleteDepartmentMutation(row.id)}
                                />
                            </Modal.Window>
                        </Modal>

                    </div>

                </td>
            </tr>
        </>
    )
}