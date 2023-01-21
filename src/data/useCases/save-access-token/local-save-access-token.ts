import { SetStorage } from '@/data/protocols/cache/set-storage';
import { UnexpectedError } from '@/domain/errors/unexpected-error';
import { SaveAccessToken } from '@/domain/useCases/save-access-token';

class LocalSaveAccessToken implements SaveAccessToken {
  constructor(private readonly setStorage: SetStorage) {}

  async save(accessToken: string): Promise<void> {
    if (!accessToken) {
      throw new UnexpectedError();
    }
    await this.setStorage.set('react-solid@accessToken', accessToken);
  }
}

export { LocalSaveAccessToken };
