import { reqOptions, IResponse, IRequestInit, IData } from '../types/ajax';
import { message } from 'antd';
const ajax = (url = '', opt: reqOptions = {}): Promise<IResponse> => {
    const method = opt.method || 'get';
    const data:IData = opt.data || {};
    const contentType = opt.contentType || '';
    const requestInit: IRequestInit = {
        method: method,
        headers: new Headers(),
        body: ''
    };

    const token:string = localStorage.getItem('token') || '';

    requestInit.headers.append('authorization', token);

    if(method === 'post' || method === 'POST'){
        requestInit.method =  'POST';
        if(contentType === 'json'){
            requestInit.headers.append('Content-Type', 'application/json;charset=utf-8');
            requestInit.body = JSON.stringify(data);
        }
        if(contentType === 'form'){
            requestInit.headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
            const formData = new FormData();
            const _dataKeys = Object.keys(data);
            _dataKeys &&　_dataKeys.forEach((_key: keyof typeof data) => {
                formData.append(String(_key), data[_key])
            })
            requestInit.body = formData;
        }
    }else if(method === 'get' || method === 'GET') {
        requestInit.method =  'GET';
        const _dataKeys = Object.keys(data);
        let _queryString = '';
        let flage = true;
        _dataKeys &&　_dataKeys.forEach((_key: keyof typeof data) => {
            if(flage){
                _queryString += '?' + _key + '=' +  data[_key];
                flage = false;
            }else{
                _queryString += '&' + _key + '=' + data[_key];
            }
        })
        url += _queryString;
    }
    
    return ajaxType(url, requestInit);
}

const ajaxType = (url: string, requestInit: IRequestInit): Promise<IResponse> => { 
    if(requestInit.method === 'get' || requestInit.method === 'GET'){
        delete requestInit.body;
    }
        return new Promise((resolve, reject) => {
            fetch(url, requestInit).then(response => {
                response.json().then(res => {
                    if(res.code === 200){
                        resolve(res);
                    }else{
                        message.error(res.msg || `接口：${url}，请求失败!`);
                        reject(res);
                    }
                })
            })
        })
    }


export default ajax;