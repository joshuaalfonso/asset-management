import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import CategoryForm from "./CategoryForm";
import { useDeleteCategory } from "./useDeleteCategory";


const CategoryRow = ({row, index}) => {

    const { deleteCategoryMutation, isDeleting} = useDeleteCategory();


    return (
        <tr>
            <td> {index + 1} </td>
            <td> {row.categoryName} </td>
            <td> 
                
                <Modal>
                    <Modal.Open opens='edit-category'>
                        <button className="btn">
                            Edit
                        </button>
                    </Modal.Open>

                    <Modal.Window name='edit-category'>
                        <CategoryForm rowToEdit={row}/>
                    </Modal.Window>


                    <Modal.Open opens='delete-category'>
                        <button className="btn">
                            Delete
                        </button>
                    </Modal.Open>

                    <Modal.Window name='delete-category'>
                        <ConfirmDelete 
                            name={row.categoryName}
                            disabled={isDeleting}
                            onConfirm={() => deleteCategoryMutation(row.id)}
                        />
                    </Modal.Window>

                </Modal>

            </td>
        </tr>
    )
}

export default CategoryRow;