import { useState, useEffect } from 'react'
import Head from './head'
import Select from './select'
import Search from './search'
import reorder from './utils'
import Foot from './foot'
import { isValid, format, parseISO } from 'date-fns'
import './style.css'
import { Initial_state_interface, DataInterface, OptionInterface } from "./types"

const INITIAL_STATE = {
    filters: {
        filter: '',
        order: ''
    },
    entries: 10,
    search: '',
    data: []
}

interface props {
    data: DataInterface[]
    option?: OptionInterface | null
}

export default function ReactDataTable({data , option = null}: props): JSX.Element {
    const [filters, setFilter] = useState<Initial_state_interface['filters']>(INITIAL_STATE.filters);
    const [entries, setEntries] = useState<Initial_state_interface['entries']>(INITIAL_STATE.entries);
    const [search, setSearch] = useState<Initial_state_interface['search']>(INITIAL_STATE.search);
    const [dataTable, setDataTable] = useState<Initial_state_interface['data']>(INITIAL_STATE.data);
    const [paginatedData, setPaginatedData] = useState<Initial_state_interface['data']>(INITIAL_STATE.data);

    // Get First Element with destructuring
    const [firstElement] = data;

    // Get All key of element
    const columnsHeader = (!data || data.length < 1)? []: Object.keys(firstElement);

    useEffect(() => {
        setFilter({filter: columnsHeader[0], order: 'asc'})
    }, [])

    useEffect(()=>{
        setDataTable(reorder(filters, search, data ))
    },[filters, search, data])

    

    const changeFilter = (column: Initial_state_interface['filters']['filter']) => {
        const order = (column === filters.filter && filters.order === 'asc')? 'desc' : 'asc'
        setEntries(entries)
        setFilter({filter: column, order: order})
    }
    
    const changeEntries = (entries: string | number) => setEntries((typeof entries == 'number')? entries :parseInt(entries, 10))
    const changeSearch = (search: string) => setSearch(search)

    const changePaginatedData = (paginatedData: DataInterface[]) => setPaginatedData(paginatedData)

    const isDate = (date: string): string | false => {
        const formatDate = parseISO(date)
        return (isValid(formatDate))? format(formatDate, 'dd/MM/yyyy'): false;
    }

    return (
        <>
        <div className='table-container'>
            {
            (!data || data.length < 1) 
                ? 'no data'
                :
                    <>
                    <div className='table-header'>
                        <Select entries={entries} changeEntries={changeEntries} options={option?.select}/>
                        <Search search={search} changeSearch={changeSearch}/>
                    </div>
                    <table>
                        <Head columns={columnsHeader} filter={filters} changeFilter={changeFilter} options={option?.head}/>
                        <tbody>
                            {paginatedData.map((row,idx)=>(
                                <tr key={`${idx}-row`}>
                                    {columnsHeader.map((column, idx)=>(<td key={`column-${idx}`} className={`${(column === filters.filter)? 'filter': ''}`}>{(isDate(row[column]))? isDate(row[column]) : row[column]}</td>))}
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>
                    <Foot table={dataTable} entries={entries} changePaginatedData={changePaginatedData}/>
                    </>
            } 
        </div>
        </>
    )
}