export interface reqOptions {
    method?: TAjax,
    data?: object,
    contentType?: string
}
export interface TAjaxType {
    [key: string]: any,
    get:(url:string, requestInit: IRequestInit)=>{},
    post: (url:string, requestInit: IRequestInit)=>{}
}
export interface IResponse<T = any> {
    status: number;
    message: string;
    data: T;
}
export interface IRequestInit {
    method: TAjax,
    headers: Headers,
    body: string | FormData
}
export interface  IData {
    [key: string]: any,
    [key: number]: any
}

export type TAjax = 'get' | 'GET' | 'POST' | 'post';