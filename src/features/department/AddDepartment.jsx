import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import DepartmentForm from "./DepartmentForm";



const AddDepartment = () => {
    return (
        <Modal>

            <Modal.Open opens='zxc'>
                <button className="btn btn-primary text-base-300">
                    Add Department
                </button>
            </Modal.Open>

            <Modal.Window name='zxc'>
                <DepartmentForm />
            </Modal.Window>

        </Modal>
    )
}

export default AddDepartment;