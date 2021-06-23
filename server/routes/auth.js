import * as passportConfig from "../config/passport.js";

export const isAuth = (req, res, next) => {
    console.log('isAuth');
        if (passportConfig.isAuthenticated()) next();
        else res.status(401).send('<h5>You are not authorized to view this resource</h5>');
    }

    export  const isAdmin = (req, res, next) => {
        if (req.isAuthenticated() && req.user.admin) next();
        else res.status(401).json({ msg: 'You are not authorized to view this resource because you are not an admin.' });
    }
