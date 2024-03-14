import React from "react";
import { Item } from "./item-provider";
import NotesList from "./notes-list";
import Modal from "./modal";

export default function ItemCard({item}: {item: Item}) {
    return (
        <li className='item-card'>
            <img  src={item.primaryImage} />
            <div className='text-content'>
                <h2 className="truncate-text">{item.title}</h2>
                <p className="truncate-text">{item.department}</p>
            </div>
            <NoteListModalButton itemId={`${item.objectID}`} />
        </li>
        
    );
}

function NoteListModalButton({itemId}: {itemId: string}) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <button onClick={(e) => {
                e.preventDefault();
                setIsOpen(true)
            }}>
                Edit notes
            </button>
            <Modal 
                isOpen={isOpen} 
                onClose={() =>  setIsOpen(false)} 
                content={
                    <NotesList itemId={itemId} />
                }
                closeButton={true}
            />
        </>
     
    );
}