import {Injectable} from '@angular/core';
import {StorageService} from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private _storage: Storage | null = null;

  constructor(private storageService: StorageService) {}

  setApiUrl(url: string) {
    this.storageService.setItem('apiUrl', url);
  }

  async getApiUrl() {
    let apiUrl: string = '';
    await this.storageService.getItem('apiUrl').then(r => apiUrl = r);
    return apiUrl;
  }
}
