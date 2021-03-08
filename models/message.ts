import { Document, model, models, Model, Schema } from 'mongoose';

interface Message extends Document {
  emailId: string;
  sentiment: string;
  keyPhrases: string;
}

const MessageSchema: Schema = new Schema({
  emailId: { type: Schema.Types.ObjectId, ref: 'Subscriber' },
  sentiment: String,
  keyPhrases: String,
});

const MessageModel: Model<Message> =
  models.Message || model('Message', MessageSchema);

export default MessageModel;
