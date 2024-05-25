export interface IStorageService {
  uploadFile(fileName: string, data: Buffer): Promise<string>;

  readFile(blobKey: string): Promise<Buffer>;

  deleteFile(blobKey: string): Promise<void>;
}
