import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


async function connect(){
  const getUri = process.env.MONGO_DB_URI;
mongoose.set('strictQuery',true)
  const db = await mongoose.connect(getUri);
  console.log('Database connected');
  return db;
}

export default connect;