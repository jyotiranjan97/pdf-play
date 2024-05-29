export type DocumentStoreProps = {
  document: DocumentModel[];
  setDocument: (document: DocumentModel) => void;
};

export type DocumentModel = {
  _id: string;
  fileName: string;
  contentType: string;
  blobKey: string;
  size: number;
  uploadedAt: Date;
  metaData?: Record<string, any>;
  isDeleted: boolean;
};
