import { ErrorMessage } from "../components/error-page";
import ItemList from "../components/item-list";
import { ItemContext } from "../components/item-provider";
import React from "react";

export default function Root() {
    const {data, isLoading, error}  = React.useContext(ItemContext);
    let content;

    if(isLoading) content = "loading....";
    else if(error || !data) content = <ErrorMessage errorText={error.message}/>
    else content = <ItemList items={data}/>

    return (
        <main>
            <section>
                {content}
            </section>
        </main>
    );
}