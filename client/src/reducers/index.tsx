import { Ilist } from '../types/tips';
import { combineReducers } from 'redux';
import { ModifyAction, IOPERATETIPSLISTAction} from '../actions';
import { DECREMENT, INCREMENT, GET_TIPS_LIST, UPDATE_TIPS_LIST, ADD_TIPS_LIST, DELETE_TIPS_LIST } from '../constants';

// 处理并返回 state

const value = (state = 0, action: ModifyAction): number => {
    switch (action.type) {
        case INCREMENT:
            return state + 1;
        case DECREMENT:
            return state - 1;
        default:
            return state
    }
}
const list = (state: Ilist[] = [] , action: IOPERATETIPSLISTAction): Ilist[] => {
    switch (action.type) {
        case GET_TIPS_LIST:
            return action.list;
        case UPDATE_TIPS_LIST:
        case ADD_TIPS_LIST:
        case DELETE_TIPS_LIST:
                return state;
        default:
            return state
    }
}
export default combineReducers({value, list})