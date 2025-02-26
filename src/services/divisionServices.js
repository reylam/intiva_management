const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class DivisionService {
    static async getAllDivisions() {
        return await prisma.division.findMany();
    }

    static async getDivisionById(id) {
        return await prisma.division.findUnique({ where: { id: Number(id) } });
    }

    static async createDivision(data) {
        return await prisma.division.create({ data });
    }

    static async updateDivision(id, data) {
        return await prisma.division.update({
            where: { id: Number(id) },
            data,
        });
    }

    static async deleteDivision(id) {
        return await prisma.division.delete({ where: { id: Number(id) } });
    }
}

module.exports = DivisionService;
