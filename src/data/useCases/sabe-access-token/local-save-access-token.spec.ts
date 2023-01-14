import { faker } from '@faker-js/faker';
import { SetStorageSpy } from '@/data/test/mock-storage';
import { LocalSaveAccessToken } from './local-save-access-token';

type SutTypes = {
  sut: LocalSaveAccessToken;
  setStorageSpy: SetStorageSpy;
};

const makeSut = (): SutTypes => {
  const setStorageSpy = new SetStorageSpy();
  const sut = new LocalSaveAccessToken(setStorageSpy);
  return {
    sut,
    setStorageSpy,
  };
};

describe('LocalSaveAccessToken', () => {
  test('Should call SetStorage with correct value', async () => {
    const { sut, setStorageSpy } = makeSut();
    const accessToken = faker.random.words();
    await sut.save(accessToken);
    expect(setStorageSpy.key).toBe('react-solid@accessToken');
    expect(setStorageSpy.value).toBe(accessToken);
  });
});
