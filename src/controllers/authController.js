const { addTokenToBlacklist } = require('../utils/blacklist');
const AuthService = require('../services/authServices');


class AuthController {
    static async register(req, res, next) {
        try {
            const result = await AuthService.register(req.body);
            res.status(201).json(  {
                msg: "berhasil register",
                result: result
            }
        );
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const result = await AuthService.login(req.body);
            res.status(200).json(
                {
                    msg: "berhasil login",
                    result: result
                }
            );
        } catch (error) {
            next(error);
        }
    }

    static async all(req, res, next) {
        try {
            const users = await AuthService.all();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }

    static async logout(req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res.status(400).json({ message: 'Token is required' });
            }

            addTokenToBlacklist(token);
            return res.status(200).json({ 
                msg: 'Logout successful',
                token: token
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AuthController;
