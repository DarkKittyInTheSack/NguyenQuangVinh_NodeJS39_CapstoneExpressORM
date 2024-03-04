import jwt from 'jsonwebtoken'
import { responseApi } from './response.js';
import { TOKEN_EXPIRED } from '../utils/jwtMessageUtil.js';

export const jwtoken = {
    createToken: (data) => jwt.sign(data,'SECRET_KEY',{algorithm: 'HS256', expiresIn: '24h' }),
    createRefreshToken: (data) => jwt.sign(data,'SECRET_REFRESH_KEY',{algorithm: 'HS256', expiresIn: '24h' }),
    checkToken: (data) => jwt.verify(data,'SECRET_KEY', (err,decode) => err),
    checkRefreshToken: (data) => jwt.verify(data,'SECRET_KEY', (err,decode) => err),
    decodeToken: (data) => jwt.decode(data),
    verifyToken: (req,res,next) =>{
        let {token} = req.headers;
        let isVerify = false

        let checkTokenHeaders = jwtoken.checkToken(token)
        checkTokenHeaders === null ? isVerify = true : isVerify = false
        return isVerify
    }
}