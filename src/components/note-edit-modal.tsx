import React from "react";
import { NotesContext } from "./note-provider";
import Modal from "./modal";


export default function NoteEditModal({itemId, noteId, isOpen, onClose }: {itemId: string; noteId?:string; isOpen: boolean, onClose: () => void}) {

    const {notes, handleCreateNote, handleEditNote} = React.useContext(NotesContext);
    const titleRef = React.useRef<HTMLInputElement | null>(null);
    const bodyRef = React.useRef<HTMLTextAreaElement | null>(null);
    const note = notes[itemId]?.find(note => note.id === noteId);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        
        const title = titleRef.current?.value ?? '';
        const body = bodyRef.current?.value ?? '';
        
        
        if(!note) handleCreateNote({itemId, title, body});
        else handleEditNote({itemId, id: note.id, title, body});

        handleClose();        
    }

    function resetValues() {
        if(titleRef.current && bodyRef.current) {
            titleRef.current.value = '';
            bodyRef.current.value = '';
        }
    }

    function handleClose() {
        resetValues();
        onClose();
    }

    return (
        <Modal 
            isOpen={isOpen}
            onClose={handleClose}
            content = {(
                <form 
                    key={crypto.randomUUID()} 
                    className='note-edit' 
                    onSubmit={handleSubmit} 
                >
                <label htmlFor='title'>Title</label>
                <input
                    ref={titleRef}
                    type="text"
                    name='title'
                    defaultValue={note?.title ?? ""}
                    required={true}
                    className='note-edit-title'
                    />
                <label htmlFor='body'>Body</label>
                <textarea 
                    ref={bodyRef}
                    name='body'
                    defaultValue={note?.body ?? ""}
                    required={true}
                    className="note-edit-body"
                />
                <div className='note-edit-buttons'>
                    <button 
                        type='button'
                        onClick={handleClose}
                    >
                        Cancel
                    </button>

                    <button
                        type='submit'
                    >
                        Save
                    </button>
                </div>
            </form>
            )}
        />
    );
}