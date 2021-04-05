import mongoose from 'mongoose';

const testDB = 'mongodb://localhost:27017/critikalTESTDB';
const MONGODB_URI =
  process.env.NODE_ENV === 'test' ? testDB : process.env.MONGODB_URI;
export default function db() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  return mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
}
