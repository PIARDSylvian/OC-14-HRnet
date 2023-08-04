import { DataInterface, FilterInterface, SearchType } from "../types"

export default function reorder(filters: FilterInterface, search: SearchType, data: DataInterface[]): DataInterface[] {
    const filteredElements = [...data]

    filteredElements.sort((a, b) => (a[filters.filter] > b[filters.filter]) ? 1 : -1)
    if (filters.order != 'asc') filteredElements.reverse()

    return (search !== '')? filterByValue(filteredElements, search): filteredElements;
}

function filterByValue(data: DataInterface[], search: SearchType): DataInterface[] { 
    return data.filter(o => Object.keys(o).some(k => o[k]?.toLowerCase().includes(search.toLowerCase())));
}
