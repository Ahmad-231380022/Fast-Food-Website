const mongoose = require('mongoose');

async function connectToDatabase() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error('MONGO_URI is not set');
  }
  mongoose.set('strictQuery', true);
  await mongoose.connect(mongoUri, {
    dbName: mongoUri.includes('mongodb+srv') ? undefined : process.env.DB_NAME,
  });
}

module.exports = { connectToDatabase };

