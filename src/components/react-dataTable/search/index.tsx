import style from './style.module.scss'

interface PropsInterface {
    search: string
    changeSearch: (data: string)=>void
}

/**
 * Render Search
 * 
 * @param {PropsInterface} props
 * @param {string} props.search
 * @param {Function} props.changeSearch
 * 
 * @returns {JSX.Element}
 */
export default function Search({search, changeSearch}: PropsInterface): JSX.Element {
    return (
        <div className={style['table-search']}>
            <label htmlFor="table-search">Search:</label>
            <input type="search" id="table-search" value={search === null? '': search} onChange={(e) => changeSearch(e.target.value)} />
        </div>
    )
}