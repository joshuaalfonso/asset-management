import { AnimatePresence, motion } from "framer-motion";
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


const Window = ({children, name, maxWidth}) => {
    

    const {openName, close} = useContext(ModalContext);

    // if (name !== openName) return null;

    return createPortal (

        <AnimatePresence 
        initial={false}
            mode="wait"
            onExitComplete={() => null}
        >

            {name === openName && (
                <motion.dialog 
                    className="modal modal-open " 
                    exit={{
                        opacity: 0,
                        transition: {
                            duration: 0.3
                        }
                     }}   
                >

                <motion.div 
                    
                    initial={{
                        opacity: 0,
                        scale: 0.75,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        transition: {
                            ease: "easeOut",
                            duration: 0.1,
                        },
                    }}
                    exit={{
                        opacity: 0,
                        scale: 0.75,
                        transition: {
                            ease: "easeIn",
                            duration: 0.1,
                        },
                    }}
                    className={`modal-box ${maxWidth && maxWidth}`}
                >

                    {cloneElement(children, {onCloseModal: close})}

                </motion.div>
            </motion.dialog>
            )}
        </AnimatePresence>,
        document.body
    );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;