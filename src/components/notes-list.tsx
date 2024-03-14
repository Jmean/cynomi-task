import React from "react";
import { NotesContext } from "./note-provider";
import NoteEntry from "./note-entry";
import AddNoteButton from "./add-note-button";

export default function NotesList({itemId}: {itemId: string}) {

    const {notes} = React.useContext(NotesContext)
    const itemNotes = notes[itemId] ?? [];

    const noteContent = !itemNotes.length ? 
        <p>You have no notes here...</p> : (
        <ul className='notes-list'>
            {itemNotes.map(note => (
                <NoteEntry 
                    key={note.id} 
                    itemId={itemId} 
                    id={note.id}  
                    title={note.title} 
                    body={note.body} 
                />
            ))
            }
        </ul>
    );

    return (
        <div className='notes-container'>
            {noteContent}
            <AddNoteButton itemId={itemId} />
        </div>
    );
}