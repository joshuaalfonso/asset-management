import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import DepartmentForm from "./DepartmentForm";



const AddDepartment = () => {
    return (
        <Modal>

            <Modal.Open opens='zxc'>
                {/* <Button btnType="primary"> 
                    Add Department
                </Button> */}
                <button className="btn">
                    asd
                </button>
            </Modal.Open>

            <Modal.Window name='zxc'>
                <DepartmentForm />
            </Modal.Window>

        </Modal>
    )
}

export default AddDepartment;