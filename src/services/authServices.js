const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');
const createError = require('http-errors');

class AuthService {
    static async register(data) {
        data.password = bcrypt.hashSync(data.password, 8);
        const user = await prisma.user.create({ data });
        const accessToken = await jwt.signAccessToken({ id: user.id, username: user.username });
        return { user, accessToken };
    }

    static async login(data) {
        const { username, password } = data;
        const user = await prisma.user.findUnique({ where: { username } });
        if (!user) throw createError.NotFound('User not registered');

        const checkPassword = bcrypt.compareSync(password, user.password);
        if (!checkPassword) throw createError.Unauthorized('Username or password not valid');

        const accessToken = await jwt.signAccessToken({ id: user.id, username: user.username });
        return { user, accessToken };
    }

    static async all() {
        return await prisma.user.findMany({
            select: { id: true, name: true, username: true, email: true, createdAt: true, updatedAt: true }
        });
    }
}

module.exports = AuthService;
