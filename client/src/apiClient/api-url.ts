export class APIEndpoint {
  public static Documents = {
    getAllDocumentsURL() {
      return '/api/documents';
    },

    getDocumentURL(id: string) {
      return `/api/documents/${id}`;
    },

    createDocumentURL() {
      return `/api/documents`;
    },

    downloadDocumentURL(id: string) {
      return `/api/documents/${id}/download`;
    },

    deleteDocumentURL(id: string) {
      return `/api/documents/${id}`;
    }
  };
}
