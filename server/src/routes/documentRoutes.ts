import { Router } from 'express';
import multer from 'multer';
import { DocumentController } from '../controller';

const upload = multer({ storage: multer.memoryStorage() });

const documentRouter = Router();

const documentController = new DocumentController();

documentRouter.get('/', (req, res) => {
  documentController.getDocuments(req, res);
});

documentRouter.get('/:id', (req, res) => {
  documentController.getDocumentById(req, res);
});

documentRouter.post('/', upload.single('file'), (req, res) => {
  documentController.createDocument(req, res);
});

documentRouter.delete('/:id', (req, res) => {
  documentController.deleteDocument(req, res);
});

export { documentRouter };
