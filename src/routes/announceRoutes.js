const router = require('express').Router();
const announceController = require('../controllers/announceController');

router.get('/', announceController.getAll);
router.get('/:id', announceController.getById);
router.post('/', announceController.create);
router.patch('/:id', announceController.update);
router.delete('/:id', announceController.deleted);

module.exports = router;
