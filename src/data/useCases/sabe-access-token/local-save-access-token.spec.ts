import { faker } from '@faker-js/faker';
import { SetStorageSpy } from '@/data/test/mock-storage';
import { LocalSaveAccessToken } from './local-save-access-token';

describe('LocalSaveAccessToken', () => {
  test('Should call SetStorage with correct value', async () => {
    const setStorageSpy = new SetStorageSpy();
    const sut = new LocalSaveAccessToken(setStorageSpy);
    const accessToken = faker.random.words();
    await sut.save(accessToken);
    expect(setStorageSpy.key).toBe('react-solid@accessToken');
    expect(setStorageSpy.value).toBe(accessToken);
  });
});
