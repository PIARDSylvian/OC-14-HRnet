export interface DataInterface {
    [key : string ] : string
}

export interface FilterInterface {
    filter: string,
    order: string,
}

export type SearchType = string

export interface Initial_state_interface {
    filters : FilterInterface,
    entries: number,
    search: SearchType,
    data: DataInterface[]
}

export interface OptionInterface {
    select? : string[] | null,
    head? : (string|null)[] | null
}