const createError = require("http-errors");
const { isTokenBlacklisted } = require("../utils/blacklist");
const jwt = require("../utils/jwt");
const prisma = require("../config/database");

const authMiddleware = {
  verifyToken: async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) throw createError.Unauthorized("Access token required");

      if (isTokenBlacklisted(token)) {
        throw createError.Unauthorized("Token has been revoked");
      }

      const decoded = await jwt.verifyAccessToken(token);
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
      });

      if (!user) throw createError.Unauthorized("User not found");

      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authMiddleware;
