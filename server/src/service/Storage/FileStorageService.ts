import fs from 'fs';
import { IStorageService } from './IStorageService';

const fsPromises = fs.promises;

export class FileStorageService implements IStorageService {
  private basePath: string;

  constructor(storageConfig: Record<string, string>) {
    if (!storageConfig) {
      throw new Error('Invalid storage config');
    }
    this.basePath = storageConfig.path;
  }

  async uploadFile(fileName: string, data: Buffer): Promise<string> {
    if (!fileName) {
      throw new Error('Invalid file name');
    }

    if (!data || !Buffer.isBuffer(data)) {
      throw new Error('Invalid file data');
    }

    const filePath = `${this.basePath}/${fileName}`;
    await fsPromises.writeFile(filePath, data);
    console.info(`File uploaded successfully at ${filePath}`);

    return filePath;
  }

  async readFile(blobKey: string): Promise<Buffer> {
    if (!blobKey) {
      throw new Error('Invalid blob key');
    }

    const filePath = `${this.basePath}/${blobKey}`;
    const data = await fsPromises.readFile(filePath);
    console.info(`File read successfully from ${filePath}`);

    return data;
  }

  async deleteFile(blobKey: string): Promise<void> {
    if (!blobKey) {
      throw new Error('Invalid blob key');
    }

    const filePath = `${this.basePath}/${blobKey}`;
    await fsPromises.unlink(filePath);
    console.info(`File deleted successfully from ${filePath}`);
  }
}
