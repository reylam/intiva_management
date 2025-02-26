const AuthService = require('../services/authServices');

const AuthController = {
    registerAdmin: async (req, res, next) => {
        try {
            const { role } = req.user;
            const admin = await AuthService.registerAdmin(req.body, role);
            res.status(201).json({ success: true, data: admin });
        } catch (error) {
            next(error);
        }
    },
    registerMember: async (req, res, next) => {
        try {
            const { role, division_id } = req.user;
            const member = await AuthService.registerMember(req.body, role, division_id);
            res.status(201).json({ success: true, data: member });
        } catch (error) {
            next(error);
        }
    },
    login: async (req, res, next) => {
        try {
            const result = await AuthService.login(req.body);
            res.status(200).json({ success: true, data: result });
        } catch (error) {
            next(error);
        }
    },
    allUsers: async (req, res, next) => {
        try {
            const users = await AuthService.all();
            res.status(200).json({ success: true, data: users });
        } catch (error) {
            next(error);
        }
    },
    logout: async (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) throw createError.Unauthorized('Token required');

            await AuthService.logout(token);
            res.status(200).json({ success: true, message: "Logout berhasil" });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = AuthController;
