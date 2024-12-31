import { createPortal } from "react-dom";






const Modal = ({children, onClose}) => {
    return createPortal (
        <dialog className="modal modal-open overflow-auto" style={{overflow: 'auto', paddingRight: '0px important!'}}>
            <div className="modal-box">
                <h3 className="font-bold text-lg">Create consumable</h3>
                {children}

                <button 
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={onClose}
                    >
                    ✕
                </button>
            </div>
        </dialog>,
        document.body
    )
}

export default Modal;