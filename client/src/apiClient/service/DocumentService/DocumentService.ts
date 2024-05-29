import { AxiosInstance } from 'axios';
import { APIEndpoint } from '../../api-url';
import { DocumentView } from '../../model';
import { IDocumentService } from './IDocumentService';

export class DocumentService implements IDocumentService {
  private static instance: DocumentService;
  private axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  public static getInstance(axiosInstance: AxiosInstance): DocumentService {
    if (!this.instance) {
      DocumentService.instance = new DocumentService(axiosInstance);
    }
    return new DocumentService(axiosInstance);
  }

  getAllDocuments(): Promise<DocumentView[]> {
    const URL = APIEndpoint.Documents.getAllDocumentsURL();
    return this.axiosInstance.get(URL);
  }
  getDocumentById(id: string): Promise<DocumentView> {
    const URL = APIEndpoint.Documents.getDocumentURL(id);
    return this.axiosInstance.get(URL);
  }
  uploadDocument(file: FormData): Promise<void> {
    const URL = APIEndpoint.Documents.createDocumentURL();
    return this.axiosInstance.post(URL, file);
  }
  deleteDocument(id: string): Promise<void> {
    const URL = APIEndpoint.Documents.deleteDocumentURL(id);
    return this.axiosInstance.delete(URL);
  }
  downloadDocument(id: string): Promise<Blob> {
    const URL = APIEndpoint.Documents.downloadDocumentURL(id);

    const headers = {
      'Content-Type': 'multipart/form-data;'
    };

    return this.axiosInstance.get(URL, { headers });
  }
  mergeDocuments(payload: any): Promise<Blob> {
    const URL = APIEndpoint.Documents.createDocumentURL();

    const headers = {
      'Content-Type': 'multipart/form-data;'
    };

    return this.axiosInstance.post(URL, payload, { headers });
  }
}
