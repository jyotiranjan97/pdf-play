export interface DocumentDto {
  fileName: string;
  contentType: string;
  blobKey: string;
  size: number;
  uploadedAt: Date;
  metaData?: Record<string, any>;
}
