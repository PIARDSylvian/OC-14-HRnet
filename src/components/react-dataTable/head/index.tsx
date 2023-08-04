import './style.css'

interface Props {
    columns: string[],
    filter: { filter: string, order: string},
    changeFilter: (data: string)=>void
    options?: (string|null)[] | null
}

export default function Head({columns, filter, changeFilter, options}: Props): JSX.Element {
    const changeOrderByColumn = (column: string) => changeFilter(column)

    return (
        <>
            <thead>
                <tr>
                    {columns.map((column, idx) => (
                        <th key={`${column}-${idx}`} className={`${(filter.filter == column)?(filter.order == 'asc')? 'asc': 'desc':''}`} onClick={() => changeOrderByColumn(column)}>
                            {(options && options[idx])? options[idx]: column}
                        </th>
                    ))}
                </tr>
            </thead>
        </>
    )
}