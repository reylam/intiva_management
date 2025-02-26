const db = require("../config/database")

const getAll = async (req, res) => {
    try {
        const tags = await db.tag.findMany();
        res.json(tags);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTagById = async (req, res) => {
    try {
        const { id } = req.params;
        const tag = await db.tag.findUnique({
            where: {id}
        });

        if (!tag) {
            return res.status(404).json({ error: "Tag not found" });
        }
        res.json(tag);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createTag = async (req, res) => {
    try {
        const tagForm= req.body;
        const newTag = await db.tag.create({
            data: { 
                name: tagForm.name
             }
        });
        res.status(201).json({ message: "Tag created", tag: newTag });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateTag = async (req, res) => {
    try {
        const { id } = req.params; // Biarkan dalam format String
        const findTag = await db.tag.findUnique({
            where: { id }
        });

        if (!findTag) {
            return res.status(404).json({ msg: "Tag not found" });
        }

        const updatedTag = await db.tag.update({
            where: { id },
            data: { name: req.body.name }
        });

        res.json({ message: "Tag updated", tag: updatedTag });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteTag = async (req, res) => {
    try {
        const tagId = +(req.params.id);
        const findTag = await db.tag.findFirst({ 
            where: { 
                id 
            }});

            if (!findTag) {
                return res.status(404).json({ msg: "tag not found" });
            }

            const deleted = await db.tag.delete({
                where: { 
                    id: tagId 
                }
            });

        res.status(200).json({ 
            msg: "Tag deleted", 
            tag: deleted
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAll, getTagById, createTag, updateTag, deleteTag };
