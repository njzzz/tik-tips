import { ICountState } from './demo';
import { reqOptions } from './ajax';
export interface Ilist {
    info: string,
    id: number,
    status: number,
    attachInfo?: string
}
export interface Istate {
    // @ts-ignore
    list: Array<Ilist>
}

export interface SITipsProps extends ITipsState {
    _getTipsList: () => {},
    _setTipsList: (opt: reqOptions) => {},
    _addTipsList: () => {},
    _deleteTipsList: (opt: reqOptions) => {}
}
export interface SITipsState{
    loading: boolean
}
export interface ITipsState extends Istate, ICountState {}