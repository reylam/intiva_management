const createError = require('http-errors');
const { isTokenBlacklisted } = require('../utils/blacklist')
const jwt = require('../utils/jwt');

const authMiddleware = {
    verifyToken: async (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) throw createError.Unauthorized('Access token required');

            if (isTokenBlacklisted(token)) {
                throw createError.Unauthorized('Token has been revoked');
            }

            const decoded = await jwt.verifyAccessToken(token);
            req.user = decoded;
            next();
        } catch (error) {
            next(error);
        }
    }
};

module.exports = authMiddleware;
