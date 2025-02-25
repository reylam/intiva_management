const jwt = require('../utils/jwt');
const createError = require('http-errors');
const { isTokenBlacklisted } = require('../utils/blacklist');

const auth = async (req, res, next) => {
    if (!req.headers.authorization) {
        return next(createError.Unauthorized('Access token is required'));
    }
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return next(createError.Unauthorized());
    }

    if (isTokenBlacklisted(token)) {
        return next(createError.Unauthorized('Token has been revoked. Please login again.'));
    }

    await jwt.verifyAccessToken(token).then(user => {
        req.user = user;
        next();
    }).catch(e => {
        next(createError.Unauthorized(e.message));
    });
};

module.exports = auth;
