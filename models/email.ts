import { Document, model, models, Model, Schema } from 'mongoose';

interface Insight extends Document {
  sentiment: string;
  keyPhrases: string[];
  priority: string;
}
interface Email extends Document {
  id: string;
  name: string;
  emailId: string;
  subject: string;
  message: string;
  senderEmail: string;
  insights: Insight;
  created_on: string;
}

const InsightSchema: Schema = new Schema({
  sentiment: String,
  keyPhrases: [String],
  priority: { type: String, default: 'normal' },
});

const EmailSchema: Schema = new Schema({
  id: String,
  name: String,
  emailId: { type: Schema.Types.ObjectId, ref: 'Subscriber' },
  subject: String,
  message: String,
  senderEmail: String,
  insights: InsightSchema,
  created_on: { type: String, default: Date.now() },
});

const EmailModel: Model<Email> = models.Email || model('Email', EmailSchema);

export default EmailModel;
