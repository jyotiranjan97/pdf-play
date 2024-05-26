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
      metaData: document.metaData
    });

    try {
      const resp = await documentModel.save();
      return resp;
    } catch (error) {
      throw new Error('Failed to save document');
    }
  }

  async getDocumentById(documentId: string): Promise<IDocument> {
    if (!documentId) {
      throw new Error('Document ID is required');
    }

    try {
      const resp = await DocumentModel.findOne({ _id: documentId })
        .where('isDeleted')
        .equals(false);

      return resp;
    } catch (error) {
      throw new Error('Failed to get document');
    }
  }

  async getDocuments(): Promise<IDocument[]> {
    try {
      const resp = await DocumentModel.find().where('isDeleted').equals(false);
      return resp;
    } catch (error) {
      throw new Error('Failed to get documents');
    }
  }

  async deleteDocument(documentId: string): Promise<IDocument> {
    try {
      const resp = await DocumentModel.findByIdAndUpdate(documentId, { isDeleted: true });
      return resp;
    } catch (error) {
      throw new Error('Failed to delete document');
    }
  }
}
