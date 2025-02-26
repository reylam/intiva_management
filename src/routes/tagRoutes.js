const router = require('express').Router();
const tagController = require('../controllers/tagController');

router.get('/', tagController.getAll);
router.get('/:id', tagController.getTagById);
router.post('/', tagController.createTag);
router.patch('/:id', tagController.updateTag);
router.delete('/:id', tagController.deleteTag);

module.exports = router;
