import { Document } from '../models';
import { IDocumentService } from './IDocumentService';

export class DocumentService implements IDocumentService {
  async createDocument(document: Document): Promise<Document> {
    throw new Error('Method not implemented.');
  }

  async getDocumentById(documentId: string): Promise<Document> {
    throw new Error('Method not implemented.');
  }

  async getDocuments(): Promise<Document[]> {
    throw new Error('Method not implemented.');
  }

  async updateDocument(documentId: string, document: Document): Promise<Document> {
    throw new Error('Method not implemented.');
  }

  async deleteDocument(documentId: string): Promise<Document> {
    throw new Error('Method not implemented.');
  }
}
