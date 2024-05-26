import { IDocument } from '../../models';
import { DocumentDto } from './DocumentDto';

export interface IDocumentService {
  createDocument(document: DocumentDto): Promise<IDocument>;

  getDocumentById(documentId: string): Promise<IDocument>;

  getDocuments(): Promise<IDocument[]>;

  updateDocument(documentId: string, document: Document): Promise<IDocument>;

  deleteDocument(documentId: string): Promise<IDocument>;
}
