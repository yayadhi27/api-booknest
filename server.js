const dotenv = require('dotenv');
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const mongoose = require('mongoose');
const app = require('./src/app');

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    if (process.env.NODE_ENV !== 'test') {
      app.listen(process.env.PORT || 3000, () => {
        console.log(`Server running on port ${process.env.PORT || 3000}`);
        console.log('Swagger docs at http://localhost:3000/api-docs');
      });
    }
  })
  .catch(err => console.error('Mongo error:', err));

module.exports = app;
