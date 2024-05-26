import { Router } from 'express';
import multer from 'multer';
import { DocumentController } from '../controller';

const upload = multer({ storage: multer.memoryStorage() });

const documentRouter = Router();

const documentController = new DocumentController();

documentRouter.get('/', (_, res) => {
  res.send([
    { id: 1, name: 'Document 1' },
    { id: 2, name: 'Document 2' },
  ]);
});

documentRouter.get('/:id', (req, res) => {
  res.send({ id: req.params.id, name: `Document ${req.params.id}` });
});

documentRouter.post('/', upload.single('file'), (req, res) => {
  documentController.createDocument(req, res);
});

documentRouter.put('/:id', (req, res) => {
  res.send({ id: req.params.id, ...req.body });
});

export { documentRouter };
