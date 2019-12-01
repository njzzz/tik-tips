import ajax from '../common/ajax';
import { reqOptions, IResponse } from '../types/ajax';
// 获取tik-tips列表
export const requestTipsList = (option?: reqOptions): Promise<IResponse> => {
    return ajax('http://127.0.0.1:7001/tickTips/getAll', option);
}
// 更新tik-tips列表项
export const requestUpdateTipsList = (option?: reqOptions): Promise<IResponse> => {
    return ajax('http://127.0.0.1:7001/tickTips/update', {method: 'POST', ...option});
}
// 新增tik-tips列表项
export const requestAddTipsList = (option?: reqOptions): Promise<IResponse> => {
    return ajax('http://127.0.0.1:7001/tickTips/addTip', {method: 'GET', ...option});
}
// 删除tik-tips列表项
export const requestDeleteTipsList = (option?: reqOptions): Promise<IResponse> => {
    return ajax('http://127.0.0.1:7001/tickTips/delete', {method: 'GET', ...option});
}
// 