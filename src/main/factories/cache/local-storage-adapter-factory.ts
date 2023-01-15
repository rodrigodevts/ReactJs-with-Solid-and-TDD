import { SetStorage } from '@/data/protocols/cache/set-storage';
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter';

const makeLocalStorageAdapter = (): SetStorage => {
  return new LocalStorageAdapter();
};

export { makeLocalStorageAdapter };
