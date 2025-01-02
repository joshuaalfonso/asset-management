
import Modal from "../../ui/Modal";
import CreateConsumableForm from "./CreateConsumableForm";
import ConsumablesTable from "./ConsumablesTable";




const AddConsumable = () => {
    return (
        <Modal>

            <Modal.Open opens='consumable-form'>
                <button className="btn btn-primary text-base-300">Add Consumable</button>
            </Modal.Open>

            <Modal.Window name='consumable-form'>
                    <CreateConsumableForm />
            </Modal.Window>

        </Modal> 
    )
}


export default AddConsumable;

// export const AddConsumable = () => {

//     const [isOpenModal, setIsOpenModal] = useState(false);

//     return (
//         <>
        
//             <button 
//                 className="btn btn-active btn-primary text-white" 
//                 onClick={() => setIsOpenModal((open) => !open)}
//             >
//                 Add Item
//             </button>

//             {isOpenModal && (
//                 <Modal onClose={() => setIsOpenModal(false)}>
//                     <CreateConsumableForm onCloseModal={() => setIsOpenModal(false)}/>
//                 </Modal>
//             )}

//         </>
//     )
// }