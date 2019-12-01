export type LOGIN = 'login';
export type REGISTER = 'register';
export type ONLINE = 'online';
export type OUTLINE = 'outline';
export type IOperateType = LOGIN | REGISTER | ONLINE | OUTLINE;
export type ISetOnlineState = React.Dispatch<React.SetStateAction<boolean>>;
export type ISetVisible = React.Dispatch<React.SetStateAction<boolean>>;
export type ISetType = React.Dispatch<React.SetStateAction<string>>;
export type IOperateStateType = (false & ((prevState: string) => string)) | (true & ((prevState: string) => string)) | (((prevState: boolean) => boolean) & string) | (((prevState: boolean) => boolean) & ((prevState: string) => string))
export interface ILoginRegisterParam {
    userName: string,
    passWord: string
}