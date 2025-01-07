import Modal from "../../ui/Modal"
import { UnitOfMeasureForm } from "./UnitOfMeasureForm"





export const AddUnitOfMeasure = () => {
    return (
        <Modal>
            <Modal.Open opens='uom-form'>
                <button className="btn btn-primary text-base-300">Add UoM</button>
            </Modal.Open>

            <Modal.Window name='uom-form'>
                    <UnitOfMeasureForm />
            </Modal.Window>

        </Modal>
    )
}