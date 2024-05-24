import { Request, Response } from 'express';
import { IDocumentService, DocumentService } from '../service';

class DocumentController {
  private documentService: IDocumentService;

  constructor() {
    this.documentService = new DocumentService();
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
      const document = req.body;
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

export { DocumentController };
