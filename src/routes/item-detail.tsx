import { useLocation } from "react-router-dom";
import { ErrorMessage } from "../components/error-page";
import NotesList from "../components/notes-list";

export default function ItemDetail() {

    const {state: item}  = useLocation();

    if(!item) {
        return (
            <main className='details-main'>
                <section className='details-section'>
                    <ErrorMessage errorText={`item not found`} />
                </section>
            </main>
        )
    }

    return (
        <main className='details-main'>
            <section className='details-section'>
                <img className='details-img' src={item.primaryImage}/>
                <div className='details-content'>
                    <div>
                    <h3>{item.title}</h3>
                    <p>{item.department}</p>
                    <p>{item.objectDate}</p>
                    </div>
                    
                    <div>
                        <p>More information:</p>
                        <ul>
                            <li><a target="_blank" href={item.objectURL}>Met Museum</a></li>
                            <li><a target="_blank" href={item.objectWikidata_URL}>Wikidata</a></li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className='details-section'>
                <NotesList itemId={item.objectID} />
            </section>
        </main>
    );
}








