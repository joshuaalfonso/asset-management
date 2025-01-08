import Modal from "../../ui/Modal";
import CategoryForm from "./CategoryForm";





const AddCategory = () => {
    return (
        <Modal>

            <Modal.Open opens='category-form'>
                <button 
                    className="btn btn-primary text-base-300">
                    Add Category
                </button>
            </Modal.Open>

            <Modal.Window name='category-form'>
                <CategoryForm />
            </Modal.Window>

        </Modal>
    )
}

export default AddCategory;