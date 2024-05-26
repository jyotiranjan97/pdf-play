import { DocumentModel, IDocument } from '../../models';
import { DocumentDto } from './DocumentDto';
import { IDocumentService } from './IDocumentService';

export class DocumentService implements IDocumentService {
  async createDocument(document: DocumentDto): Promise<IDocument> {
    const documentModel = new DocumentModel({
      fileName: document.fileName,
      contentType: document.contentType,
      blobKey: document.blobKey,
      size: document.size,
      uploadedAt: document.uploadedAt,
      metaData: document.metaData,
    });

    const resp = await documentModel.save();
    return resp;
  }

  async getDocumentById(documentId: string): Promise<IDocument> {
    throw new Error('Method not implemented.');
  }

  async getDocuments(): Promise<Document[]> {
    throw new Error('Method not implemented.');
  }

  async updateDocument(documentId: string, document: Document): Promise<IDocument> {
    throw new Error('Method not implemented.');
  }

  async deleteDocument(documentId: string): Promise<IDocument> {
    throw new Error('Method not implemented.');
  }
}
