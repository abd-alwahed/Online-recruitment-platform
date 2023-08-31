


export type Attribute = {
    [key : string] : string | number | {data: Data | Data[]} 
}
export type Data = {
    id: number;
    attributes: Attribute;
}

export type Response <T extends object> = {
    data: Data[ ] | Data;
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        }
    }
}