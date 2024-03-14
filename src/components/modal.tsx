import React from "react";
import { createPortal } from "react-dom";

export default function Modal({ 
    isOpen, 
    onClose, 
    width,
    content,
    closeButton = false
}: { isOpen: boolean; onClose: () => void; width?:number; content: React.ReactNode, closeButton?: boolean}) {

    const [isModalOpen, setIsModalOpen] = React.useState(isOpen);
    const ref = React.useRef<HTMLDialogElement | null>(null);

    React.useEffect(() => {
        setIsModalOpen(isOpen)
    }, [isOpen]);

    React.useEffect(() => {

        const modal = ref.current;
        if(isModalOpen) modal?.showModal();
        else modal?.close();

    }, [isModalOpen]);

    function handleClose() {
        onClose();
        setIsModalOpen(false);
    }

    function handleEscape(event: React.KeyboardEvent<HTMLDialogElement>) {
        if(event.key === 'Escape') handleClose();
    }


    return (
        createPortal(
        <dialog 
            onClick={(e) => {
               e.stopPropagation()
            }}
            onKeyDown={handleEscape} 
            ref={ref} 
            className='modal'
            style={{width}}
        >
            {closeButton && (
                <div className='modal-header'>
                    <button onClick={handleClose}>x</button>
                </div>
            )}
            <div className='modal-content'>
                {content}
            </div>
        </dialog>, document.querySelector('#root')!)
        
    );
}