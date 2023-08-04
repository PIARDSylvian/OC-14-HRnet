import './style.css'

interface Props {
    search: string
    changeSearch: (data: string)=>void
}

export default function Search({search, changeSearch}: Props): JSX.Element {
    return (
        <div className="table-search">
            <label htmlFor="table-search">Search:</label>
            <input type="search" id="table-search" value={search === null? '': search} onChange={(e) => changeSearch(e.target.value)} />
        </div>
    )
}