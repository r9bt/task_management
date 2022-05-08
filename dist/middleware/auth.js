"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jwt = require("jsonwebtoken");
require("dotenv/config");
const auth = (req, res, next) => {
    const token = _getToken(req);
    if (!token)
        return next();
    try {
        res.locals.decode = jwt.verify(token, process.env.JWT_SECRET);
        next();
    }
    catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            console.error("トークンの有効期限が切れています。", e);
        }
        else if (e instanceof jwt.JsonWebTokenError) {
            console.error("トークンが不正です。", e);
        }
        else {
            console.error("トークンの検証でその他のエラーが発生しました。", e);
        }
        throw e;
    }
};
exports.auth = auth;
const _getToken = (req) => {
    if (req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer") {
        return req.headers.authorization.split(" ")[1];
    }
};
//# sourceMappingURL=auth.js.map