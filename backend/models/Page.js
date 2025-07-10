import mongoose from 'mongoose';

const pageSchema = new mongoose.Schema({
  PageName: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  keywords: { type: String },
  metaDesc: { type: String },
}, { timestamps: true });

export default mongoose.model('Page', pageSchema);
