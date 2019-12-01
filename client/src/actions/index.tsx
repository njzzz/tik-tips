import { DECREMENT, INCREMENT, GET_TIPS_LIST, UPDATE_TIPS_LIST, ADD_TIPS_LIST, DELETE_TIPS_LIST } from '../constants';
import { Ilist } from '../types/tips';

export interface IINCREMENTAction {
    type: INCREMENT;
}

export interface IDECREMENTAction {
    type: DECREMENT;
}

export interface IGETTIPSLISTAction {
    type: GET_TIPS_LIST,
    list: Ilist[]
}

export interface IUPDATETIPSLISTAction {
    type: UPDATE_TIPS_LIST
}
export interface IADDTIPSLISTAction {
    type: ADD_TIPS_LIST
}
export interface IDELETETIPSLISTAction {
    type: DELETE_TIPS_LIST
}

// 定义 modifyAction 类型，包含 IINCREMENTAction 和 IDECREMENTAction 接口类型
export type ModifyAction = IINCREMENTAction | IDECREMENTAction;

export interface IOPERATETIPSLISTAction {
    type: GET_TIPS_LIST | UPDATE_TIPS_LIST | ADD_TIPS_LIST | DELETE_TIPS_LIST,
    list: Ilist[]
}
export interface IOPERATETIPSLISTAction {
    type: GET_TIPS_LIST | UPDATE_TIPS_LIST | ADD_TIPS_LIST | DELETE_TIPS_LIST
}
// 增加 state 次数的方法
export const increment = (): IINCREMENTAction => ({
    type: INCREMENT,
});

// 减少 state 次数的方法
export const decrement = (): IDECREMENTAction => ({
    type: DECREMENT
});

//请求tips列表
export const getTipsList = (list: Ilist[]): IGETTIPSLISTAction => ({
    type: GET_TIPS_LIST,
    list: list
});

//更新tips列表
export const updateTipsList = (): IUPDATETIPSLISTAction => ({
    type: UPDATE_TIPS_LIST
});

//新增tips列表
export const addTipsList = (): IADDTIPSLISTAction => ({
    type: ADD_TIPS_LIST
});

//删除tips列表
export const deleteTipsList = (): IDELETETIPSLISTAction => ({
    type: DELETE_TIPS_LIST
});


