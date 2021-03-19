import { Document, model, Model, models, Schema } from 'mongoose';

interface Tag extends Document {
  subscriber: string;
  tags: string[];
}

const TagSchema: Schema = new Schema({
  subscriber: { type: Schema.Types.ObjectId, ref: 'Subscriber' },
  tags: [String],
});

const TagModel: Model<Tag> = models.Tag || model<Tag>('Tag', TagSchema);

export default TagModel;
