const db = require("../config/database")

const getAll = async (req, res) => {
    try {
        const category = await db.category.findMany();
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
}

const createCategory = async (req, res) => {
    try {
        const categoryForm = req.body
        const category = await db.category.create({
        data: {
            name: categoryForm.name,    
        }})
        res.json(category)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    } 
} 

module.exports = {
    getAll,
    createCategory
}