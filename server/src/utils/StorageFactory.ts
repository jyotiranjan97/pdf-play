import { IStorageService, S3StorageService } from '../service';
import { FileStorageService } from '../service/Storage/FileStorageService';

class StorageFactory {
  public storageService: IStorageService;
  private static instance: StorageFactory;

  public static getInstance(): StorageFactory {
    if (!StorageFactory.instance) {
      StorageFactory.instance = new StorageFactory();
    }

    return StorageFactory.instance;
  }

  registerStorageService(storageConfig: Record<string, any>) {
    if (!storageConfig) {
      throw new Error('Invalid storage config');
    }

    if (!storageConfig.type) {
      throw new Error('Storage type is required');
    }

    const storageType = storageConfig.type;

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
