const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');
const createError = require('http-errors');
const { addTokenToBlacklist } = require('../utils/blacklist');

class AuthService {
    static async registerAdmin(data, requesterRole) {
        if (requesterRole !== 'SUPER_ADMIN') {
            throw createError.Forbidden('Only super admins can create admins');
        }
        
        data.password = bcrypt.hashSync(data.password, 8);
        const admin = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                photo_profile: data.photo_profile || null,
                role: 'ADMIN',
                division_id: data.division_id 
            }
        });
        const accessToken = await jwt.signAccessToken({ id: admin.id, email: admin.email });
        return { admin, accessToken };
    }

    static async registerMember(data, requesterRole, requesterDivisionId) {
        if (requesterRole !== 'ADMIN') {
            throw createError.Forbidden('Only admins can create members');
        }
        
        data.password = bcrypt.hashSync(data.password, 8);
        const member = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                photo_profile: data.photo_profile || null,
                role: 'MEMBER',
                division_id: requesterDivisionId
            }
        });
        const accessToken = await jwt.signAccessToken({ id: member.id, email: member.email });
        return { member, accessToken };
    }

    static async login(data) {
        const { email, password } = data;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw createError.NotFound('User not registered');

        const checkPassword = bcrypt.compareSync(password, user.password);
        if (!checkPassword) throw createError.Unauthorized('Email or password not valid');

        const accessToken = await jwt.signAccessToken({ id: user.id, email: user.email, role: user.role, division_id: user.division_id });
        return { user, accessToken };
    }

    static async all() {
        return await prisma.user.findMany({
            select: { id: true, name: true, email: true, photo_profile: true, role: true, division_id: true, createdAt: true, updatedAt: true }
        });
    }

    static async logout(token) {
        addTokenToBlacklist(token);
        return { success: true, message: "Logout berhasil" };
    }

}

module.exports = AuthService;
