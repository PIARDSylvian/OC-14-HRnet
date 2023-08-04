import { useState, useEffect } from 'react'
import './style.css'
import { DataInterface } from "../types"

interface Props {
    table: DataInterface[],
    entries: number,
    changePaginatedData: (data: DataInterface[])=>void
}

export default function Foot({table, entries, changePaginatedData}: Props): JSX.Element {
    const [index, setIndex] = useState<number>(1);
    const step = Math.ceil(table.length / entries)

    const paginateButton = [];
    for (let idx = 1; idx <= step; idx++) {
        if(idx >= index-1 && idx < index + 2) {
            paginateButton.push(<button className={(index === idx)? 'current': ''} key={`page-${idx}`} onClick={()=>paginate(idx)}>{idx}</button>)
        }    
    }

    //if table or number entries change set index to 1
    useEffect(()=> setIndex(1), [table, entries])

    //if index change use changePaginatedData
    useEffect(()=> changePaginatedData((table.slice((index-1) * entries, index * entries))), [index, entries, table])

    const paginate = (index: number) => {
        if(index < 1) setIndex(1)
        else if (index > step) setIndex(step)
        else setIndex(index)
    }

    return (
        <div className='table-footer'>
            <div>
                <p>{`Showing ${((index-1) * entries) + 1} to ${(index * entries > table.length)? table.length: index * entries} of ${table.length} entries`}</p>
            </div>
            <div>
                <button onClick={()=>paginate(index-1)}>Previous</button>
                {paginateButton}
                <button onClick={()=>paginate(index+1)}>Next</button>
            </div>
        </div>
    )
}

