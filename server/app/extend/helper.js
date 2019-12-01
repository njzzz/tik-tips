'use strict';
const jwt = require('jsonwebtoken');
module.exports = {
  sucess(data) {
    return {
      code: 200,
      msg: 'sucess',
      data: data || null,
    };
  },
  error(errmsg = '') {
    return {
      code: 400,
      msg: errmsg || 'error',
      data: null,
    };
  },
  notNull() {
    const args = [ ...arguments ];
    return args.length && args.every(val => {
      return val !== null && val !== '' && val !== undefined;
    });
  },
  generaterToken(userInfo) {
    const payload = userInfo;
    const secretOrPrivateKey = 'privateKey';
    const options = { algorithm: 'HS256', expiresIn: '1h' };
    const token = jwt.sign(payload, secretOrPrivateKey, options);
    return token;
  },
  async verifyToken(token) {
    const secretOrPrivateKey = 'privateKey';
    const res = await jwt.verify(token, secretOrPrivateKey, { algorithm: 'HS256' });
    return res;
  },
};
