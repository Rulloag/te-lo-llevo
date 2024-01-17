import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init().then(r => console.log(`StorageService init: [${r}]`));
  }

  async init() {
    this._storage = await this.storage['create']();
  }

  setItem(key: string, value: any) {
    this._storage?.['set'](key, value);
  }

  getItem(key: string) {
    return this._storage?.['get'](key);
  }
}
