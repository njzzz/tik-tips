import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IResponse } from '../types/ajax';
import { ITipsState, Ilist} from '../types/tips';
import { reqOptions } from '../types/ajax';
import { decrement, increment, getTipsList, updateTipsList, addTipsList, deleteTipsList} from '../actions';
import { requestTipsList, requestUpdateTipsList, requestAddTipsList, requestDeleteTipsList } from '../api/tips';

import Tips from '../pages/tips';

// 将 reducer 中的状态插入到组件的 props 中
const mapStateToProps = (state: ITipsState ): ITipsState => ({
    value: state.value,
    list: state.list
});
// 将 对应action 插入到组件的 props 中
const mapDispatchToProps = (dispatch: Dispatch) => ({
    onDecrement: () => dispatch(decrement()),
    onIncrement: () => dispatch(increment()),
    _getTipsList: async () => {
        const res: IResponse<Ilist[]> = await requestTipsList();
        dispatch(getTipsList(res.data));
    },
    _setTipsList: async (opt: reqOptions) => {
        await requestUpdateTipsList(opt);
        dispatch(updateTipsList());
    },
    _addTipsList: async () => {
        await requestAddTipsList();
        dispatch(addTipsList());
    },
    _deleteTipsList: async (opt: reqOptions) => {
        await requestDeleteTipsList(opt);
        dispatch(deleteTipsList());
    },
    
});

// 使用 connect 高阶组件对 Counter 进行包裹
export default connect(mapStateToProps, mapDispatchToProps)(Tips);