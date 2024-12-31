import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";





const ModalContext = createContext();


const Modal = ({children}) => {

    const [openName, setOpenName] = useState('');
    const close = () => setOpenName('');
    const open = setOpenName;

    return (
        <ModalContext.Provider value={
            {
                openName,
                close,
                open
            }
        }>
            {children}
        </ModalContext.Provider>
    )

}

const Open = ({children, opens: opensWindowName}) => {
    const { open } = useContext(ModalContext);

    return cloneElement(children, {onClick: () => open(opensWindowName)});
}


const Window = ({children, name}) => {

    const {openName, close} = useContext(ModalContext);

    if (name !== openName) return null;

    return createPortal (
        <dialog className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Create consumable</h3>

                {cloneElement(children, {onCloseModal: close})}

                <button 
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={close}
                    >
                    ✕
                </button>
            </div>
        </dialog>,
        document.body
    )
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;