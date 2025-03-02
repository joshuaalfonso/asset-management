import { useState } from "react";
import { url } from "../../config/pocketbase";
import { motion } from "framer-motion";
import Modal from "../../ui/Modal";
import PurchaseRequestForm from "./PurchaseRequestForm";


const PurchaseRequestRow = ({row, index}) => {

    const {
        purchaseRequestDate, 
        purchaseRequestNumber, 
        status, 
        totalAmount,
        expand
    } = row;

    const [showItems, setShowItems] = useState(false);

    const formattedDate = new Date(purchaseRequestDate).toLocaleDateString();

    return (
        <>
            <tr> 
                <th>{index + 1}</th>
                <td>
                    { formattedDate }
                </td>
                <td>{purchaseRequestNumber}</td>
                <td>
                    {/* {status} */}
                    {status === 'Pending' && <div className="badge bg-yellow-300/10 text-yellow-400">{status}</div>}
                    {status === 'Approved' && <div className="badge bg-green-300/10 text-green-400">{status}</div>}

                </td> 
                <td>₱ {totalAmount}</td>
                <td>
                    <div className="flex gap-3">

                    <button 
                        className="btn bg-base-100" 
                        onClick={() => setShowItems(show => !show)}
                    >
                       {showItems ? (
                            <i className="fi fi-rr-angle-small-up"></i>
                        ): <i className="fi fi-rr-angle-small-down"></i>}
                    </button>

                    <Modal>
                        <Modal.Open opens='edit-pr'>
                            <button 
                                className="btn bg-base-100" 
                            >
                                Edit
                            </button>
                        </Modal.Open>

                        <Modal.Window name='edit-pr' maxWidth='max-w-5xl'>
                            <PurchaseRequestForm rowToEdit={row}/>
                        </Modal.Window>
                    </Modal>

                    </div>
                </td>
            </tr>      

            <tr>

                {showItems && (
                    <td colSpan={12} className="bg-base-200" style={{maxHeight: 0}}>
                    <table className="w-full">

                        <tbody className="flex flex-col gap-3 pl-6 border-l-2 border-l-base-100" style={{borderLeft: '1px solid base-100'}}>

                            {expand?.purchaseRequestItems_via_purchaseRequestId.map((prItems) => {

                                const {
                                    id: prId,
                                    quantity,
                                    unitOfMeasure,
                                    unitPrice
                                } = prItems;

                                const {
                                    id: itemId, 
                                    image, 
                                    name: itemName, 
                                    type,
                                    collectionId: itemCollectionId, 
                                    expand
                                } = prItems?.expand?.item;

                                const fileUrl = `${url}api/`;

                                return (
                                    <tr key={prId} className="">            
                                        <td className="grid grid-cols-3 items-center bg-base-100 rounded-xl p-3">
                                            {/* <div className="flex gap-3">
                                                <img 
                                                    src={`${fileUrl}files/${itemCollectionId}/${itemId}/${image}`} 
                                                    width={50} 
                                                    height={50} 
                                                    className="bg-white object-cover rounded"
                                                />
                                                <div className="flex flex-col justify-between">
                                                    <span className="font-semibold tracking-wide">{itemName}</span>
                                                    <span  className="text-xs">{expand?.categoryId?.categoryName}</span>
                                                </div>
                                            </div> */}
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img src={`${fileUrl}files/${itemCollectionId}/${itemId}/${image}`}/>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-1">
                                                    <div className="font-bold"> {itemName} </div>
                                                    <div className="flex items-center gap-2 text-sm opacity-50">
                                                        <i className="fi fi-rr-tags flex"></i>
                                                        {expand?.categoryId?.categoryName}
                                                    </div>
                                                </div>
                                            </div>

                                            <span>
                                                <kbd className="kbd">
                                                    {quantity} {expand?.unitOfMeasureId?.uomCode}
                                                </kbd>
                                            </span>

                                            <span>₱ {unitPrice}</span>
                                        </td>
                                        
                                    </tr>
                                )
                            })}


                        </tbody>

                        </table>
                    </td>
                )}
            </tr>

        </>
    )
}

export default PurchaseRequestRow;