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
        uploadedAt: new Date(),
      };

      const newDocument = await this.documentService.createDocument(document);
      res.status(201).json(newDocument);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateDocument(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const document = req.body;
      const updatedDocument = await this.documentService.updateDocument(id, document);
      res.status(200).json(updatedDocument);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteDocument(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.documentService.deleteDocument(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default DocumentController;
