import jwt from 'jsonwebtoken';
const secret = 'test';
/*
const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
        let decodeData;

        if (token && isCustomAuth) {
            decodeData = jwt.verify(token, secret);
            req.userId = decodeData.id;
        } else {
            decodeData = jwt.decode(token);
            req.email = decodeData.email;
        }
        next();
    }
    catch (err) {
        console.log(err);
    }
}
*/
export const auth = async (req, res, next)=>{
    try {
       await type(req);
        next();
    } catch (err) { console.log(err); }
}

export const isAdmin = async (req, res, next) => {
    try {
       let type= await type(rec);
       type=='admin' && next();
    } catch (err) { console.log(err); }
}

 const type = async (req) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        let decodeData;

        if (token) {
            decodeData = jwt.verify(token, secret);
            req.userId = decodeData.id;
        }
        return decodeData.type;
    } catch (err) { console.log(err); }
}

