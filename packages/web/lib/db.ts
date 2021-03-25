import mongoose from 'mongoose';

let MONGODB_URI = 'mongodb://localhost:27017/critikalDB';
if (process.env.NODE_ENV === 'production') {
  MONGODB_URI = process.env.MONGODB_URI;
}
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
