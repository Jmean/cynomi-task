import React from "react";
import useSWR from "swr";

export interface Item {
    objectID: number;
    objectDate: string;
    objectURL: string;
    objectWikidata_URL: string;
    title: string;
    department: string;
    primaryImage: string;
    primaryImageSmall: string;
    additionalImages: string[]
}

interface ItemContext {
    data: Item[];
    error?: any;
    isLoading: boolean;
    decrementPage: () => void;
    incrementPage: () => void;
}

const api = 'https://collectionapi.metmuseum.org/public/collection/v1';
const PAGE_SIZE = 15;

async function fetcher(endpoint: string, page: number) {
    const response = await fetch(endpoint);
    const objectIds = (await response.json()).objectIDs;

    const start = page * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    const currentIds = objectIds.slice(start, end);
    
    const currentObjects = (await Promise.all(
        currentIds.map(async(id: string) => {
            return fetch(`${api}/objects/${id}`).then(res => res.json())
        })
    )).filter(obj =>obj.objectID !== undefined)

    return currentObjects;
}

export const ItemContext = React.createContext({} as ItemContext);

export function ItemProvider({children}: {children: React.ReactNode}) {

    const [page, setPage] = React.useState(0);
    const {data, error, isLoading } = useSWR<Item[]>([`${api}/search?q=''&hasImages=true`, page], ([url, page]) => fetcher(url, page as number));

    function decrementPage() {
        setPage((currPage) => {
            if(currPage > 0) return currPage -1;
            return currPage; 
        })
    }
    function incrementPage() {
        setPage((currPage) => currPage + 1);
    }

    const value = {
        decrementPage,
        incrementPage,
        data: data ?? [],
        error,
        isLoading
    };

    return (
        <ItemContext.Provider value = {value}>
            {children}
        </ItemContext.Provider>
    );
}