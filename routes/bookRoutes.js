const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const upload = require('../middleware/upload');

router.get('/', bookController.getAllBooks);

router.get('/books/add', bookController.showAddForm);
router.post('/books', upload.single('image'), bookController.createBook);

router.get('/books/:id', bookController.getBook);

router.get('/books/:id/edit', bookController.showEditForm);
router.put('/books/:id', upload.single('image'), bookController.updateBook);

router.delete('/books/:id', bookController.deleteBook);

module.exports = router;
