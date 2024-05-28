import { IDocument } from '../../models';

export interface IDocumentMergeService {
  mergeDocuments(documents: IDocument[]): Promise<Buffer>;
}
