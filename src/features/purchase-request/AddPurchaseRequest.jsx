import Modal from "../../ui/Modal";
import PurchaseRequestForm from "./PurchaseRequestForm";







const AddPurchaseRequest = () => {
    return (
        <Modal>
            <Modal.Open opens='pr-form'>
                <button className="btn btn-primary text-base-300">Add Purchase Request</button>
            </Modal.Open>

            <Modal.Window name='pr-form'>
                    <PurchaseRequestForm />
            </Modal.Window>

        </Modal>
    )
}

export default AddPurchaseRequest;