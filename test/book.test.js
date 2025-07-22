const request = require('supertest');
const app = require('../src/app');

let token;

beforeEach(async () => {
  const res = await request(app)
    .post('/api/auth/signup')
    .send({
      name: 'Book Admin',
      email: 'admin@book.com',
      password: 'admin123',
      role: 'admin',
    });
  token = res.body.token;
});

describe('Book API', () => {
  it('should add a new book', async () => {
    const res = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Book',
        author: 'Author Name',
        description: 'Great book'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('bookId');
  });

  it('should get list of books', async () => {
    const res = await request(app)
      .get('/api/books')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should update a book', async () => {
    const book = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Old Title',
        author: 'Old Author',
        description: 'Old Desc'
      });

    const res = await request(app)
      .put(`/api/books/${book.body.bookId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'New Title' });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('New Title');
  });

  it('should delete a book', async () => {
    const book = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'To be deleted',
        author: 'Author',
        description: 'Description'
      });

    const res = await request(app)
      .delete(`/api/books/${book.body.bookId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Book deleted');
  });
});
