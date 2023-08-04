import style from './style.module.scss'

interface PropsInterface {
    columns: string[],
    filter: {filter: string, order: string},
    changeFilter: (data: string)=>void
    options?: (string|null)[] | null
}

/**
 * Render Table Header
 * 
 * @param {PropsInterface} props
 * @param {string[]} props.column
 * @param {{filter: string, order: string}} props.filter
 * @param {Function} props.changeFilter
 * @param {(string|null)[] | null} [props.options]
 * 
 * @returns {JSX.Element}
 */
export default function Head({columns, filter, changeFilter, options}: PropsInterface): JSX.Element {
    const changeOrderByColumn = (column: string) => changeFilter(column)

    return (
        <>
            <thead className={style['thead']}>
                <tr>
                    {columns.map((column, idx) => (
                        <th key={`${column}-${idx}`} className={`${(filter.filter == column)?(filter.order == 'asc')? style['asc']: style['desc']:''}`} onClick={() => changeOrderByColumn(column)}>
                            {(options && options[idx])? options[idx]: column}
                        </th>
                    ))}
                </tr>
            </thead>
        </>
    )
}