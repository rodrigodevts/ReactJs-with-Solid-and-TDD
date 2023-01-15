import { SetStorage } from '@/data/protocols/cache/set-storage';
import { SaveAccessToken } from '@/domain/useCases/save-access-token';

class LocalSaveAccessToken implements SaveAccessToken {
  constructor(private readonly setStorage: SetStorage) {}

  async save(accessToken: string): Promise<void> {
    await this.setStorage.set('react-solid@accessToken', accessToken);
  }
}

export { LocalSaveAccessToken };
