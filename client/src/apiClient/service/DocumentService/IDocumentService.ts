import { DocumentView } from '../../model';

export interface IDocumentService {
  getAllDocuments(): Promise<DocumentView[]>;

  getDocumentById(id: string): Promise<DocumentView>;

  uploadDocument(file: FormData): Promise<void>;

  deleteDocument(id: string): Promise<void>;

  downloadDocument(id: string): Promise<Blob>;

  mergeDocuments(payload: any): Promise<Blob>;
}
