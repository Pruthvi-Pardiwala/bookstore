const Book = require('../models/Book');
const fs = require('fs');
const path = require('path');

const CATEGORIES = [
  'Fiction', 'Non-Fiction', 'Science', 'Technology', 'History',
  'Biography', 'Finance', 'Self-Help', 'Fantasy', 'Mystery',
  'Romance', 'Horror', 'Children', 'Educational', 'Other'
];

const deleteImage = (imagePath) => {
  if (imagePath) {
    const fullPath = path.join(__dirname, '../uploads', path.basename(imagePath));
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const { search, category, sort } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } }
      ];
    }
    if (category && category !== 'All') {
      query.category = category;
    }

    let sortOption = { createdAt: -1 };
    if (sort === 'title') sortOption = { title: 1 };
    if (sort === 'price_asc') sortOption = { price: 1 };
    if (sort === 'price_desc') sortOption = { price: -1 };

    const books = await Book.find(query).sort(sortOption);
    const totalBooks = await Book.countDocuments();
    const totalValue = await Book.aggregate([
      { $group: { _id: null, total: { $sum: { $multiply: ['$price', '$quantity'] } } } }
    ]);

    res.render('index', {
      books,
      totalBooks,
      totalValue: totalValue[0]?.total || 0,
      categories: CATEGORIES,
      search: search || '',
      selectedCategory: category || 'All',
      sort: sort || 'newest'
    });
  } catch (err) {
    console.error(err);
    res.render('index', { books: [], totalBooks: 0, totalValue: 0, categories: CATEGORIES, search: '', selectedCategory: 'All', sort: 'newest', error: 'Failed to fetch books.' });
  }
};

exports.showAddForm = (req, res) => {
  res.render('add', { categories: CATEGORIES, error: null, formData: {} });
};

exports.createBook = async (req, res) => {
  try {
    const { title, author, category, price, quantity, description } = req.body;
    const image = req.file ? '/uploads/' + req.file.filename : null;

    const book = new Book({ title, author, category, price, quantity, description, image });
    await book.save();

    res.redirect('/?success=Book added successfully!');
  } catch (err) {
    if (req.file) deleteImage('/uploads/' + req.file.filename);
    const errorMsg = err.message || 'Failed to add book.';
    res.render('add', { categories: CATEGORIES, error: errorMsg, formData: req.body });
  }
};

exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.redirect('/?error=Book not found');
    res.render('detail', { book });
  } catch (err) {
    res.redirect('/?error=Invalid book ID');
  }
};

exports.showEditForm = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.redirect('/?error=Book not found');
    res.render('edit', { book, categories: CATEGORIES, error: null });
  } catch (err) {
    res.redirect('/?error=Invalid book ID');
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { title, author, category, price, quantity, description } = req.body;
    const book = await Book.findById(req.params.id);
    if (!book) return res.redirect('/?error=Book not found');

    let image = book.image;
    if (req.file) {
      deleteImage(book.image);
      image = '/uploads/' + req.file.filename;
    }

    await Book.findByIdAndUpdate(req.params.id, {
      title, author, category, price, quantity, description, image
    }, { runValidators: true });

    res.redirect('/?success=Book updated successfully!');
  } catch (err) {
    if (req.file) deleteImage('/uploads/' + req.file.filename);
    const book = await Book.findById(req.params.id).catch(() => null);
    res.render('edit', { book, categories: CATEGORIES, error: err.message || 'Failed to update book.' });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (book) deleteImage(book.image);
    res.redirect('/?success=Book deleted successfully!');
  } catch (err) {
    res.redirect('/?error=Failed to delete book.');
  }
};
