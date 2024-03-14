import { Link } from "react-router-dom"

export function Header() {
    return (
        <nav>
            <Link to='/' children={(
                <h1>
                    Metropolitan Museum of Art Collection
                </h1>
            )} />
            
        </nav>
    )
}