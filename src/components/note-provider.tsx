import React from "react";

export interface Note {
    id: string;
    title: string;
    body: string;
}
interface NoteState {
    [itemId: string]: Note[];
}
interface NotesContext {
    notes: NoteState;
    handleCreateNote: (props:{ itemId: string; title:string; body:string }) => void;
    handleEditNote: (props: {itemId: string} & Note) => void;
    handleDismissNote: (props:{ itemId:string; id:string; }) => void;
}

export const NotesContext = React.createContext({} as NotesContext);

export default function NoteProvider({children}: {children: React.ReactNode}) {

    const [notes, setNotes] = React.useState<NoteState | null>(null);

    React.useEffect(() => {
        const storedNotes = localStorage.getItem('notes');
        setNotes(storedNotes ? JSON.parse(storedNotes) : {});
    }, []);

    React.useEffect(() => {
        if(notes !== null){
            localStorage.setItem('notes', JSON.stringify(notes));
        }
    }, [notes]);

    function handleCreateNote({itemId, title, body}: { itemId: string; title:string; body:string }) {

        const newNote = {
          id: crypto.randomUUID(),
          title,
          body
        }

        const itemNotes = notes?.[itemId] ?? [];
    
        setNotes({...notes, [itemId]: [...itemNotes, newNote]})
    }

    function handleEditNote({itemId, id, title, body}: {itemId: string;} & Note) {
        
        if(notes) {
            const editedNote: Note = {
                id,
                title,
                body
            };

            const itemNotes = notes[itemId].map(note => {
                if(note.id === id) return editedNote;
                return note
            });
            
            setNotes({...notes, [itemId]: itemNotes});
        }
    }
    
    function handleDismissNote({itemId, id}: {itemId:string; id:string}) {

        if(notes) {
            const itemNotes = notes[itemId].filter(note => note.id !== id);           
            const newNotes = {...notes, [itemId]: itemNotes};
            if(itemNotes.length === 0) delete newNotes[itemId];
            
            setNotes(newNotes);
        }
    }

    const value = {
        notes: notes ?? {},
        handleCreateNote,
        handleEditNote,
        handleDismissNote,
    }

    return (
        <NotesContext.Provider  value={value}>
            {children}
        </NotesContext.Provider>
    )
}