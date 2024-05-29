export interface DocumentView {
  _id: string;
  fileName: string;
  contentType: string;
  blobKey: string;
  size: number;
  uploadedAt: Date;
  metaData?: Record<string, any>;
  isDeleted: boolean;
}
