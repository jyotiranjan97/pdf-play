import config from 'config';
import { IStorageService } from '../service';
import { FileStorageService } from '../service/Storage/FileStorageService';
import { S3StorageService } from '../service/Storage/S3StorageService';

class StorageFactory {
  public storageService: IStorageService;
  private static instance: StorageFactory;

  public static getInstance(): StorageFactory {
    if (!StorageFactory.instance) {
      console.log('Creating new instance');
      StorageFactory.instance = new StorageFactory();
    }

    return StorageFactory.instance;
  }

  constructor() {
    const storageConfig = config.get('storage') as any;

    if (!storageConfig) {
      throw new Error('Invalid storage config');
    }

    const storageType = storageConfig.type;
    if (!storageType) {
      throw new Error('Storage type is required');
    }

    switch (storageType.toLowerCase()) {
      case 'file':
        this.storageService = new FileStorageService(storageConfig);
        break;
      case 's3':
        this.storageService = new S3StorageService(storageConfig.aws);
        break;
      default:
        throw new Error('Invalid storage type');
    }
  }

  public getStorageService(): IStorageService {
    return this.storageService;
  }
}

export default StorageFactory.getInstance();
