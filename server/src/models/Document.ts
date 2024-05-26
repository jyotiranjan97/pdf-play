import mongoose from 'mongoose';

export interface IDocument extends mongoose.Document {
  _id: string;
  fileName: string;
  contentType: string;
  blobKey: string;
  size: number;
  uploadedAt: Date;
  metaData?: Record<string, any>;
  isDeleted: boolean;
}

const documentSchema = new mongoose.Schema<IDocument>({
  fileName: { type: String, required: true },
  contentType: { type: String, required: true },
  blobKey: { type: String, required: true },
  size: { type: Number, required: true },
  uploadedAt: { type: Date, required: true },
  metaData: { type: Object },
  isDeleted: { type: Boolean, default: false }
});

export const DocumentModel = mongoose.model<IDocument>('Document', documentSchema);
