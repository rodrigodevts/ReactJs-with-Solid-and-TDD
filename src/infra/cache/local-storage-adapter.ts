import { SetStorage } from '@/data/protocols/cache/set-storage';

class LocalStorageAdapter implements SetStorage {
  async set(key: string, value: any): Promise<void> {
    localStorage.setItem(key, value);
  }
}

export { LocalStorageAdapter };
