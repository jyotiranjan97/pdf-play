export interface IDocumentService {
  createDocument(document: Document): Promise<Document>;

  getDocumentById(documentId: string): Promise<Document>;

  getDocuments(): Promise<Document[]>;

  updateDocument(documentId: string, document: Document): Promise<Document>;

  deleteDocument(documentId: string): Promise<Document>;
}
