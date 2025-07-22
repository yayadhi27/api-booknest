const Book = require('/Users/jabaya573@apac.comcast.com/Desktop/booknest-api/src/models/book.js');

exports.listBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

exports.addBook = async (req, res) => {
  const { title, author, description } = req.body;
  const lastBook = await Book.findOne().sort({ bookId: -1 });
  const bookId = lastBook ? lastBook.bookId + 1 : 1;
  const book = await Book.create({ bookId, title, author, description });
  res.status(201).json(book);
};

exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const updated = await Book.findOneAndUpdate({ bookId: parseInt(id) }, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Book not found' });
  res.json(updated);
};

exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  const deleted = await Book.findOneAndDelete({ bookId: parseInt(id) });
  if (!deleted) return res.status(404).json({ message: 'Book not found' });
  res.json({ message: 'Book deleted' });
};

