import { Router } from 'express';
import multer from 'multer';
import { DocumentController } from '../controller';

const upload = multer({ storage: multer.memoryStorage() });

const documentRouter = Router();

const documentController = new DocumentController();

documentRouter.get('/', (req, res) => {
  /* #swagger.tags = ['Documents']
      #swagger.description = 'Endpoint to get all documents'
      #swagger.responses[200] = {
        description: 'Documents retrieved successfully'
      }
      #swagger.responses[500] = {
        description: 'Server error'
      }
    */
  documentController.getDocuments(req, res);
});

documentRouter.get('/:id', (req, res) => {
  /* #swagger.tags = ['Documents']
      #swagger.description = 'Endpoint to get a document by id'
      #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        type: 'string',
        description: 'The id of the document to retrieve'
      }
      #swagger.responses[200] = {
        description: 'Document retrieved successfully'
      }
      #swagger.responses[400] = {
        description: 'Bad request'
      }
      #swagger.responses[404] = {
        description: 'Document not found'
      }
      #swagger.responses[500] = {
        description: 'Server error'
      }
    */
  documentController.getDocumentById(req, res);
});

documentRouter.post('/', upload.single('file'), (req, res) => {
  /* #swagger.tags = ['Documents']
      #swagger.description = 'Endpoint to create a document'
      #swagger.parameters['file'] = {
        in: 'formData',
        required: true,
        type: 'file',
        description: 'The file to upload'
      }
      #swagger.responses[201] = {
        description: 'Document created successfully'
      }
      #swagger.responses[400] = {
        description: 'Bad request'
      }
      #swagger.responses[500] = {
        description: 'Server error'
      }
    */
  documentController.createDocument(req, res);
});

documentRouter.delete('/:id', (req, res) => {
  /* #swagger.tags = ['Documents']
      #swagger.description = 'Endpoint to delete a document by id'
      #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        type: 'string',
        description: 'The id of the document to delete'
      }
      #swagger.responses[204] = {
        description: 'Document deleted successfully'
      }
      #swagger.responses[404] = {
        description: 'Document not found'
      }
      #swagger.responses[500] = {
        description: 'Server error'
      }
    */
  documentController.deleteDocument(req, res);
});

export { documentRouter };
