import { PDFDocument } from 'pdf-lib';
import { IDocument } from '../../models';
import { storageFactory } from '../../utils';
import { IStorageService } from '../Storage';
import { IDocumentMergeService } from './IDocumentMergeService';

export class DocumentMergeService implements IDocumentMergeService {
  private readonly storageService: IStorageService;

  constructor() {
    this.storageService = storageFactory.getStorageService();
  }

  async mergeDocuments(documents: IDocument[]): Promise<Buffer> {
    try {
      if (!documents || documents.length === 0) {
        throw new Error('Documents are required');
      }

      const merged_pdf = await PDFDocument.create();

      for (const document of documents) {
        if (!document.id) {
          throw new Error('Document ID is required');
        }

        const docBuffer = await this.storageService.readFile(document.blobKey);

        if (!docBuffer) {
          throw new Error(`Document ${document.fileName} could not be read`);
        }

        const pdfDoc = await PDFDocument.load(docBuffer);
        const copiedPages = await merged_pdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
        copiedPages.forEach((page) => merged_pdf.addPage(page));
      }

      const mergedPdfBuffer = await merged_pdf.save({
        useObjectStreams: true
      });

      return Buffer.from(mergedPdfBuffer);
    } catch (error) {
      throw new Error(error.message || 'An error occurred while merging documents');
    }
  }
}
