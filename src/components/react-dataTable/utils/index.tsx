type filterType = {
    filter: string,
    order: string,
}

type search = string

type dataType = {
    [key : string ] : string
}


export default function reorder(filters : filterType, search : search, data : dataType[]) :dataType[] {
    const filteredElements = [...data]

    filteredElements.sort((a, b) => (a[filters.filter] > b[filters.filter]) ? 1 : -1)
    if (filters.order != 'asc') filteredElements.reverse()

    return (search !== '')? filterByValue(filteredElements, search): filteredElements;
}

function filterByValue(data : dataType[], search : search) :dataType[] { 
    return data.filter(o => Object.keys(o).some(k => o[k]?.toLowerCase().includes(search.toLowerCase())));
}
