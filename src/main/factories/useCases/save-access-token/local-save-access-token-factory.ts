import { LocalSaveAccessToken } from '@/data/useCases/save-access-token/local-save-access-token';
import { SaveAccessToken } from '@/domain/useCases/save-access-token';
import { makeLocalStorageAdapter } from '@/main/factories/cache/local-storage-adapter-factory';

const makeLocalSaveAccessToken = (): SaveAccessToken => {
  return new LocalSaveAccessToken(makeLocalStorageAdapter());
};

export { makeLocalSaveAccessToken };
