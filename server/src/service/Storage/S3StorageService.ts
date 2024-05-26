import AWS from 'aws-sdk';
import { IStorageService } from './IStorageService';

export class S3StorageService implements IStorageService {
  private s3: AWS.S3;
  private bucketName: string;

  constructor(storageConfig: Record<string, string>) {
    if (!storageConfig) {
      throw new Error('Invalid storage config');
    }
    const { accessKeyId, secretAccessKey, region, bucket } = storageConfig;
    this.createS3Service(accessKeyId, secretAccessKey, region);
    this.bucketName = bucket;
  }

  private createS3Service(accessKeyId: string, secretAccessKey: string, region: string) {
    this.s3 = new AWS.S3({
      accessKeyId,
      secretAccessKey,
      region
    });
  }

  async uploadFile(fileName: string, data: Buffer): Promise<string> {
    if (!fileName) {
      throw new Error('Invalid file name');
    }

    if (!data || !Buffer.isBuffer(data)) {
      throw new Error('Invalid file data');
    }

    const params = {
      Bucket: this.bucketName,
      Key: fileName,
      Body: data
    };

    await this.s3.upload(params).promise();
    console.info(`File uploaded successfully at ${fileName}`);

    return fileName;
  }

  async readFile(blobKey: string): Promise<Buffer> {
    if (!blobKey) {
      throw new Error('Invalid blob key');
    }

    const params = {
      Bucket: this.bucketName,
      Key: blobKey
    };

    const data = await this.s3.getObject(params).promise();
    console.info(`File read successfully from ${blobKey}`);

    return data.Body as Buffer;
  }

  async deleteFile(blobKey: string): Promise<void> {
    if (!blobKey) {
      throw new Error('Invalid blob key');
    }

    const params = {
      Bucket: this.bucketName,
      Key: blobKey
    };

    await this.s3.deleteObject(params).promise();
    console.info(`File deleted successfully from ${blobKey}`);
  }
}
