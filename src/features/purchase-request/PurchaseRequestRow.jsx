import { useState } from "react";
import { url } from "../../config/pocketbase";
import { motion } from "framer-motion";


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
                    {status === 'Pending' && <div className="badge bg-yellow-300/20 text-yellow-400">{status}</div>}
                    {status === 'Approved' && <div className="badge bg-green-300/20 text-green-400">{status}</div>}

                </td> 
                <td>{totalAmount}</td>
                <td>
                    <button className="btn bg-base-100" onClick={() => setShowItems(show => !show)}>collapse</button>
                </td>
                {/* <td>
                    <div className="flex gap-3">

                    <button 
                        className="btn"
                    >
                        Edit
                    </button>


                    </div>
                </td> */}
            </tr>      

            <tr>
                {showItems && (
                    <td colSpan={12} className="bg-base-200" style={{maxHeight: 0}}>
                    <table className="w-full">

                        <tbody className="flex flex-col gap-3">

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
                                } = prItems?.expand?.item;

                                const fileUrl = `${url}api/`;

                                return (
                                    <tr key={prId}>            
                                        <td className="flex justify-between items-center bg-base-100 rounded-xl p-3">
                                            <div className="flex gap-3">
                                                <img 
                                                    src={`${fileUrl}files/${itemCollectionId}/${itemId}/${image}`} 
                                                    width={50} 
                                                    height={50} 
                                                    className="bg-white object-cover rounded"
                                                />
                                                <div className="flex flex-col justify-between">
                                                    <span className="font-semibold tracking-wide">{itemName}</span>
                                                    <span  className="text-xs">{type}</span>
                                                </div>
                                            </div>

                                            <span>{quantity}</span>
                                            <span>{unitOfMeasure}</span>
                                            <span>{unitPrice}</span>
                                        </td>
                                        
                                    </tr>
                                )
                            })}


                        </tbody>

                        </table>
                    </td>
                )}
            </tr>

            {/* {expand?.purchaseRequestItems_via_purchaseRequestId.map((prItems) => {

                const {
                    id: itemId, 
                    image, 
                    name: itemName, 
                    type,
                    collectionId: itemCollectionId, 
                } = prItems?.expand?.item;

                const fileUrl = `${url}api/`;

                return (
                    <tr>
                        <td colSpan={12} className="bg-base-200">
                            <div className="flex justify-between">
                            <img src={`${fileUrl}files/${itemCollectionId}/${itemId}/${image}`} width={50}/>
                            <span>{itemName}</span>
                            <span>{type}</span>
                            </div>
                        </td>
                    </tr>
                )
            })} */}

        </>
    )
}

export default PurchaseRequestRow;