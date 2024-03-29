import jwt from 'jsonwebtoken'

export const jwtoken = {
    createToken: (data) => jwt.sign(data,'SECRET_KEY',{algorithm: 'HS256', expiresIn: 86400*1 }),
    createRefreshToken: (data) => jwt.sign(data,'SECRET_REFRESH_KEY',{algorithm: 'HS256', expiresIn: 86400*7 }),
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