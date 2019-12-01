import ajax from '../common/ajax';
import { reqOptions, IResponse } from '../types/ajax';

// 用户注册
export const requestLogin = (option?: reqOptions): Promise<IResponse> => {
    return ajax('http://127.0.0.1:7001/user/login', {method: 'POST', ...option});
}
