export interface Ipost {
    title:string,
    body:string,
    userId:number,
    id:string
}

export interface Ipostres {
    [key : string] : Ipost
}

export interface Iresp {
    name: string
}