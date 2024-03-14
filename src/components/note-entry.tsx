import React from "react";
import NoteEditModal from "./note-edit-modal";
import { Note, NotesContext } from "./note-provider";

export default function NoteEntry({itemId, id, title, body}: {itemId:string} & Note) {

    const [isOpen, setIsOpen] = React.useState(false);
    const {handleDismissNote} = React.useContext(NotesContext);

    return (
        <>
            <li 
                className='note-entry' 
                onClick={() => setIsOpen(true)}
                tabIndex={0}
            >
                <div className='note-entry-row note-entry-title '>
                    <p><strong>{title}</strong></p>
                    <p className='note-entry-body truncate-text'>{body}</p>
                </div>
                <button onClick={() => handleDismissNote({itemId, id})}>delete</button>
            </li>
            <NoteEditModal 
                itemId={itemId}
                noteId={id}
                isOpen={isOpen} 
                onClose={() => setIsOpen(false)} 
            />
        </>
    )
}