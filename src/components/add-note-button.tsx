import React from "react";
import NoteEditModal from "./note-edit-modal";

export default function AddNoteButton({itemId}: {itemId: string}) {

    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <button className='note-action-button' onClick={(e) => {
                e.preventDefault();
                setIsOpen(true)
            }}>
                +
            </button>
            <NoteEditModal itemId={itemId} isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
     
    );
}