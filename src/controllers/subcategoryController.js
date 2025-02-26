const db = require("../config/database")

const createSubCategory = async (req, res) => {
    try {
        const { name, category_id } = req.body;

        const category = await db.category.findUnique({
            where: { id: category_id }
        });

        if (!category) {
            return res.status(404).json({ message: "Category tidak ditemukan" });
        }

        const subCategory = await db.subCategory.create({
            data: {
                name,
                category_id 
            }
        });

        res.status(201).json({
            message: "SubCategory berhasil dibuat",
            subCategory
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAll = async (req, res) => {
    try {
        const subCategories = await db.subCategory.findMany({
            include: {
                category: true 
            }
        });
        res.status(200).json(subCategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createSubCategory, getAll };
