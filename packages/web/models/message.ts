import { Document, model, models, Model, Schema } from 'mongoose';

interface Insight extends Document {
  sentiment: string;
  keyPhrases: string[];
  priority: string;
}
interface Message extends Document {
  id: string;
  name: string;
  receiver: string;
  subject: string;
  message: string;
  senderEmail: string;
  insights: Insight;
  status: 'open' | 'actionable' | 'resolved';
  created_on: string;
}

const InsightSchema: Schema = new Schema({
  sentiment: String,
  keyPhrases: [String],
  priority: { type: String, default: 'normal' },
});

const MessageSchema: Schema = new Schema({
  id: String,
  name: String,
  receiver: { type: Schema.Types.ObjectId, ref: 'Subscriber' },
  subject: String,
  message: String,
  senderEmail: String,
  insights: InsightSchema,
  status: { type: String, default: 'open' },
  created_on: { type: String, default: Date.now() },
});

const MessageModel: Model<Message> =
  models.Message || model('Message', MessageSchema);

export default MessageModel;
