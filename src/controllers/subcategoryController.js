const db = require("../config/database");

const createSubCategory = async (req, res) => {
  try {
    console.log(req.body);
    const { name, category_id } = req.body;

    const category = await db.category.findUnique({
      where: { id: category_id },
    });

    if (!category) {
      return res.status(404).json({ message: "Category tidak ditemukan" });
    }

    const subCategory = await db.subCategory.create({
      data: {
        name,
        category_id,
      },
    });

    res.status(201).json({
      message: "SubCategory berhasil dibuat",
      subCategory,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAll = async (req, res) => {
  try {
    const subCategories = await db.subCategory.findMany({
      include: {
        category: true,
        contents: true,
      },
    });

    res.status(200).json(subCategories);
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    res.status(500).json({ message: error.message });
  }
};

const getBySubCategory = async (req, res) => {
  const { id } = req.params;
  const idUniques = id;

  const subCategories = await db.subCategory.findMany({
    where: id ? { id: id } : {},
    include: {
      category: true,
      contents: true,
    },
  });
  res.status(200).json(subCategories);
};

module.exports = { createSubCategory, getAll, getBySubCategory };
