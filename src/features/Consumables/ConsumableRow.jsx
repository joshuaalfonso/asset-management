import { useState } from "react";
import { url } from "../../config/pocketbase";
import CreateConsumableForm from "./CreateConsumableForm";
import useDeleteConsumable from "./useDeleteConsumable";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";



const ConsumableRow = ({row, index}) => {

    const { id, collectionId, image, name, type} = row;
 
    const fileUrl = `${url}api/`;

    const {isDeleting, deleteConsumable} = useDeleteConsumable();

    return (
        <>
            <tr>
                <th>{index + 1}</th>
                <td>
                    {/* <img src={`${fileUrl}files/${collectionId}/${id}/${image}`} width={50} height={50} className="bg-base-content rounded object-cover"/> */}
                    <div className="flex items-center gap-3">
                        <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                                <img src={`${fileUrl}files/${collectionId}/${id}/${image}`} width={50} height={50} className="bg-base-content rounded object-cover"/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="font-bold"> {row.name} </div>
                            <div className="flex items-center gap-2 text-sm opacity-50">
                                <i className="fi fi-rr-tags flex"></i>
                                {row.expand?.categoryId?.categoryName}
                            </div>
                        </div>
                    </div>
                </td>
                <td>
                    <kbd className="kbd">
                        {row.expand?.unitOfMeasureId?.uomCode} 
                    </kbd> 
                </td>
                <td> {type} </td>
                <td> {row.expand?.assigned_to?.name} </td>
                <td>
                    <div className="flex gap-3">


                        <Modal>
                            <Modal.Open opens='edit'>
                                <button 
                                    className="btn"
                                >
                                    Edit
                                </button>
                            </Modal.Open>

                            <Modal.Window name='edit'>
                                <CreateConsumableForm rowToEdit={row}/>
                            </Modal.Window>

                            <Modal.Open opens='delete'>
                                <button 
                                    className="btn"
                                >
                                    delete
                                </button>
                            </Modal.Open>

                            <Modal.Window name='delete'>
                                <ConfirmDelete 
                                    resourceName='consumable'
                                    name={name}
                                    disabled={isDeleting}
                                    onConfirm={() => deleteConsumable(id)}
                                />
                            </Modal.Window>
                        </Modal>


                    </div>
                </td>
            </tr>    
            
        </>
    )
}

export default ConsumableRow;