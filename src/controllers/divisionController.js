const DivisionService = require('../services/divisionServices');

const DivisionController = {
    getAll: async (req, res, next) => {
        try {
            const divisions = await DivisionService.getAllDivisions();
            res.json({ success: true, data: divisions });
        } catch (error) {
            next(error);
        }
    },

    getById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const division = await DivisionService.getDivisionById(id);
            if (!division) return res.status(404).json({ success: false, message: 'Division not found' });
            res.json({ success: true, data: division });
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const { name } = req.body;
            if (!name) return res.status(400).json({ success: false, message: 'Name is required' });

            const newDivision = await DivisionService.createDivision({ name });
            res.status(201).json({ success: true, data: newDivision });
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const updatedDivision = await DivisionService.updateDivision(id, { name });

            res.json({ success: true, data: updatedDivision });
        } catch (error) {
            next(error);
        }
    },

    delete: async (req, res, next) => {
        try {
            const { id } = req.params;
            await DivisionService.deleteDivision(id);
            res.json({ success: true, message: 'Division deleted successfully' });
        } catch (error) {
            next(error);
        }
    },
};

module.exports = DivisionController;
