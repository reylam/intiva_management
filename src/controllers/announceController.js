const db = require("../config/database")


const getAll = async (req, res) => {
    try {
        const contents = await db.content.findMany({
            include: {
                tag: true,
                category: true
            }
        });
        res.json(contents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const content = await db.content.findUnique({
            where: { 
                id 
            },
            include: { 
                tag: true, 
                category: true 
            }});
        if (!content) {
            return res.status(404).json({ error: "Content not found" });
        }
        res.json(content);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const create = async (req, res) => {
    try {
        const contentFrom = req.body;
        const newContent = await db.content.create({
            data: { 
                title: contentFrom.title, 
                description: contentFrom.description, 
                imagePath: contentFrom.imagePath, 
                tag_id: contentFrom.tag_id, 
                category_id : contentFrom.category_id
            }
        });
        res.status(201).json({ message: "Content created", content: newContent });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const update = async (req, res) => {
    try {
        const contentId = +(req.params.id);
        const findContent = await db.content.findFirst({
            where: { 
                id: contentId 
            }
        });
        if (!findContent) {
            return res.status(404).json({ 
                msg: "content not found" 
            });
        }

        const updatedContent = await db.content.update({
            where: { 
                id 
            },
            data: { 
                title: req.body.title, 
                description: req.body.description, 
                imagePath: req.body.imagePath, 
                tag_id: req.body.tag_id, 
                category_id: req.body.category_id 
            }
        });
        res.json({ 
            message: "Content updated", 
            content: updatedContent 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleted = async (req, res) => {
    try {
        const contentId = (+req.params.id);
        const findContent = await db.content.findFirst({
             where: { 
                id 
            } 
        });

        if (!findContent) {
            return res.status(404).json({ msg: "content not found" });
        }
        const deleted = await db.content.delete({
            where: { id: contentId }
        });
        res.status(200).json({ 
            msg: "content deleted successfully",
            content: deleted
         });
    } catch (error) {
        console.error("Error deleting content:", error);
        res.status(500).json({
            msg: "Error deleting content",
            error: error.message
        });
    }
};

module.exports = { getAll, getById, create, update, deleted };
