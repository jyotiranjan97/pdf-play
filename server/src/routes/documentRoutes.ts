import { Router } from 'express';

const documentRouter = Router();

documentRouter.get('/', (_, res) => {
  res.send([
    { id: 1, name: 'Document 1' },
    { id: 2, name: 'Document 2' },
  ]);
});

documentRouter.get('/:id', (req, res) => {
  res.send({ id: req.params.id, name: `Document ${req.params.id}` });
});

documentRouter.post('/', (req, res) => {
  res.send(req.body);
});

documentRouter.put('/:id', (req, res) => {
  res.send({ id: req.params.id, ...req.body });
});

export { documentRouter };
