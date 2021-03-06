import { Document, model, Schema, Model, models } from 'mongoose';
import crypto from 'crypto';
import util from 'util';

const pbkdf2 = util.promisify(crypto.pbkdf2);

interface Subscriber extends Document {
  email: string;
  name: string;
  salt: string;
  hash: string;
  hashPassword: (password: string) => void;
  compare: (password: string) => boolean;
}

const SubscriberSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, require: true },
  salt: String,
  hash: String,
});

SubscriberSchema.methods.hashPassword = async function (
  this: Subscriber,
  password: string
) {
  this.salt = crypto.randomBytes(16).toString('hex');
  const hash = await pbkdf2(password, this.salt, 1000, 64, 'sha512');
  this.hash = hash.toString('hex');
};

SubscriberSchema.methods.compare = async function (
  this: Subscriber,
  password: string
) {
  const hash: string = (
    await pbkdf2(password, this.salt, 1000, 64, 'sha512')
  ).toString('hex');
  return this.hash === hash;
};

const subscriberModel: Model<Subscriber> =
  models.Subscriber || model<Subscriber>('Subscriber', SubscriberSchema);

export default subscriberModel;
