import axios, { AxiosInstance } from 'axios';
import { DocumentService } from './service';
import { toServiceError } from './service-error';

export class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string) {
    this.axiosInstance = this.createAxiosInstance(baseUrl);
  }

  private createAxiosInstance(baseURL: string): AxiosInstance {
    try {
      const axiosInstance: AxiosInstance = axios.create({ baseURL });

      axiosInstance.interceptors.request.use((axiosRequestConfig: any) => {
        axiosRequestConfig.headers = {
          Accept: 'application/json',
          ...axiosRequestConfig.headers
        };

        return axiosRequestConfig;
      });

      axiosInstance.interceptors.response.use(
        (result) => result.data,
        (error) => toServiceError(error)
      );

      return axiosInstance;
    } catch (error) {
      throw new Error('Failed to create axios instance');
    }
  }

  public getDocumentService() {
    return DocumentService.getInstance(this.axiosInstance);
  }
}
