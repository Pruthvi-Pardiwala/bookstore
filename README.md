# 📚 BookStore Management System

A full-featured **Book Store Management System** built with **Node.js**, **Express.js**, **MongoDB**, **EJS**, and **Multer** — supporting complete CRUD operations with image upload functionality.

---

## 🎯 Problem Definition

Bookstore owners often struggle to manage their inventory manually. This web-based system digitizes the entire process — allowing staff to add, view, update, and delete book records including cover images, price, and stock levels — all from a clean browser interface.

---

## 🚀 Features

- 📖 **View All Books** — Browse the entire collection in a responsive card grid
- ➕ **Add New Book** — Form with image upload via Multer
- ✏️ **Edit Book** — Update any field; replace cover image
- 🗑️ **Delete Book** — Permanently remove a book record and its image
- 🔍 **Search & Filter** — Filter by title/author, category, and sort order
- 📊 **Dashboard Stats** — Total books and total inventory value
- 📱 **Responsive Design** — Works on desktop and mobile

---

## 🗂️ Folder Structure

```
bookstore/
├── app.js                    # Entry point — Express setup
├── package.json
├── .gitignore
│
├── models/
│   └── Book.js               # Mongoose Schema & Model
│
├── controllers/
│   └── bookController.js     # CRUD logic (getAllBooks, createBook, etc.)
│
├── routes/
│   └── bookRoutes.js         # Express Router
│
├── middleware/
│   └── upload.js             # Multer configuration
│
├── views/
│   ├── index.ejs             # All Books / Dashboard
│   ├── add.ejs               # Add New Book form
│   ├── edit.ejs              # Edit Book form
│   ├── detail.ejs            # Book Detail page
│   ├── 404.ejs               # 404 error page
│   └── partials/
│       ├── header.ejs
│       └── footer.ejs
│
├── public/
│   ├── css/
│   │   └── style.css         # Main stylesheet
│   └── js/
│       └── main.js           # Client-side JS
│
└── uploads/                  # Uploaded book cover images
    └── .gitkeep
```

---

## 🧾 MongoDB Schema

```javascript
const bookSchema = new mongoose.Schema({
  title:       { type: String, required: true, maxlength: 200 },
  author:      { type: String, required: true, maxlength: 100 },
  category:    { type: String, required: true, enum: [...] },
  price:       { type: Number, required: true, min: 0 },
  quantity:    { type: Number, required: true, min: 0, default: 0 },
  description: { type: String, maxlength: 1000 },
  image:       { type: String, default: null }
}, { timestamps: true });
```

---

## 🔧 Tech Stack

| Tech | Role |
|------|------|
| Node.js | Runtime environment |
| Express.js | Server & routing |
| MongoDB + Mongoose | Database & ODM |
| EJS | Server-side templating |
| Multer | Image upload middleware |
| method-override | PUT/DELETE from HTML forms |
| Nodemon | Dev auto-restart |

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js v18+
- MongoDB running locally (`mongodb://127.0.0.1:27017`)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/your-username/bookstore-management.git
cd bookstore-management

# 2. Install dependencies
npm install

# 3. Start MongoDB (if not already running)
mongod

# 4. Run with Nodemon (development)
npm run dev

# 5. Open in browser
# http://localhost:3000
```

---

## 📌 API Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | View all books (dashboard) |
| GET | `/books/add` | Show add book form |
| POST | `/books` | Create new book |
| GET | `/books/:id` | View book detail |
| GET | `/books/:id/edit` | Show edit form |
| PUT | `/books/:id` | Update book |
| DELETE | `/books/:id` | Delete book |

---

## 💡 Example Book Record

```json
{
  "title": "Rich Dad Poor Dad",
  "author": "Robert Kiyosaki",
  "category": "Finance",
  "price": 499,
  "quantity": 10,
  "description": "A story that challenges the way you think about money...",
  "image": "/uploads/book-1718000000000-123456789.jpg"
}
```

---

## 📸 Screenshots

> Add screenshots of your running application here after deployment.

1. **Dashboard** — Card grid with all books, stats, search & filters<img width="1900" height="1106" alt="localhost_3000_ (1)" src="https://github.com/user-attachments/assets/39a8bfaf-e8a0-46f8-b473-6d9e23ce4861" />

2. **Add Book** — Two-column form with image upload zone<img width="1900" height="1296" alt="localhost_3000_books_add" src="https://github.com/user-attachments/assets/67746ac8-c850-494b-a64e-3dae26189769" />

3. **Edit Book** — Pre-filled form with current image preview<img width="1900" height="1300" alt="localhost_3000_books_6a1dd3818dbcd64f01a7e3b8_edit" src="https://github.com/user-attachments/assets/3dfbac13-f95d-4802-8271-94e4dac308b4" />

4. **Book Detail** — Full detail view with metadata grid<img width="1900" height="1150" alt="localhost_3000_books_6a1dd48e8dbcd64f01a7e3c3" src="https://github.com/user-attachments/assets/f4b5382b-0f54-415d-883a-f7067ce062d8" />


---

## 📝 Marking Scheme

| Component | Marks |
|-----------|-------|
| Add Book + Form + Multer | 2 |
| View + MongoDB Data Display | 2 |
| Update Book | 2 |
| Delete Book | 2 |
| GitHub + README + Project Structure | 2 |
| **Total** | **10** |
