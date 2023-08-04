export interface DataInterface {
    [key : string ] : string
}

export interface FilterInterface {
    filter: string,
    order: string,
}

export interface Initial_state_interface {
    filters : FilterInterface,
    entries: number,
    search: string,
    data: DataInterface[]
}

export interface OptionInterface {
    select? : string[] | null,
    head? : (string|null)[] | null
}