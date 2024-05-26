import { Request, Response } from 'express';
import { DocumentService, IDocumentService, IStorageService } from '../service';
import { storageFactory } from '../utils';

class DocumentController {
  private readonly documentService: IDocumentService;
  private readonly storageService: IStorageService;

  constructor() {
    this.documentService = new DocumentService();
    this.storageService = storageFactory.getStorageService();
  }

  async getDocuments(_: Request, res: Response) {
    try {
      const document = await this.documentService.getDocuments();
      res.status(200).json(document);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getDocumentById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new Error('Document ID is required');
      }

      const document = await this.documentService.getDocumentById(id);

      if (!document) {
        res.status(404).json({ error: 'Document not found' });
        return;
      }

      res.status(200).json(document);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createDocument(req: Request, res: Response) {
    try {
      const file = req.file;

      if (!file) {
        throw new Error('File not found');
      }

      const fileName = file.originalname;
      const fileSize = file.size;
      const fileType = file.mimetype;
      const fileData = file.buffer;

      const resp = await this.storageService.uploadFile(fileName, fileData);

      if (!resp) {
        throw new Error('Failed to upload file');
      }

      const document = {
        fileName: fileName,
        contentType: fileType,
        blobKey: resp,
        size: fileSize,
        uploadedAt: new Date()
      };

      const newDocument = await this.documentService.createDocument(document);
      res.status(201).json(newDocument);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteDocument(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new Error('Document ID is required');
      }

      const resp = await this.documentService.deleteDocument(id);

      if (!resp) {
        res.status(404).json({ error: 'Document not found' });
        return;
      }

      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default DocumentController;
