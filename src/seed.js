const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');

    const divisions = ['Programing', 'MA', 'Management', 'Makro'];
    for (const name of divisions) {
        const existingDivision = await prisma.division.findFirst({
            where: { name },
        });

        if (!existingDivision) {
            await prisma.division.create({ data: { name } });
            console.log(`Division '${name}' created!`);
        }
    }

    const existingSuperAdmin = await prisma.user.findFirst({
        where: { role: 'SUPER_ADMIN' },
    });
    if (!existingSuperAdmin) {
        const hashedPassword = bcrypt.hashSync('superadmin123', 8);
        await prisma.user.create({
            data: {
                name: 'Super Admin',
                email: 'superadmin@example.com',
                password: hashedPassword,
                role: 'SUPER_ADMIN',
            },
        });

        console.log('Super Admin created!');
    } else {
        console.log('Super Admin already exists.');
    }
}

main()
    .catch((e) => {
        console.error('Error seeding database:', e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
