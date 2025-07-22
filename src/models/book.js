const mongoose = require('mongoose');
const Counter = require('./counterModel'); 

const bookSchema = new mongoose.Schema({
  bookId: { type: Number, unique: true }, 
  title: String,
  author: String,
  description: String
});

bookSchema.pre('save', async function (next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { id: 'bookId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.bookId = counter.seq;
  }
  next();
});

module.exports = mongoose.model('Book', bookSchema);

