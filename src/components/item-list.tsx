import React from "react";
import { Item, ItemContext } from "./item-provider";
import { Link } from "react-router-dom";
import ItemCard from "./item-card";

export default function ItemList({items}: {items: Item[]}) {

    const {decrementPage, incrementPage} = React.useContext(ItemContext);

    return (
        <div>
            <ul className='item-list'>
                {
                    items.map(item => (
                        <Link key={item.objectID}
                            children={<ItemCard key={item.objectID} item={item} />}
                            to={`item/${item.objectID}`}
                            state={item}
                        />   
                    ))
                }
            </ul>
            <div className='item-list-buttons'>
                <button onClick={decrementPage}>Prev</button>
                <button onClick={incrementPage}>Next</button>
            </div>
        </div>
    )
}