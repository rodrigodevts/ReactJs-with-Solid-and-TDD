import { HttpPostClientSpy } from '@/data/test/mock-http';
import { AccountModel } from '@/domain/models/AccountModel';
import { mockAddAccountParams } from '@/domain/test/mock-add-account';
import { AddAccountParams } from '@/domain/useCases/add-account';
import { faker } from '@faker-js/faker';
import { RemoteAddAccount } from './remote-add-account';

describe('RemoteAddAccount', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const httpPostClientSpy = new HttpPostClientSpy<
      AddAccountParams,
      AccountModel
    >();
    const url = faker.internet.url();
    const sut = new RemoteAddAccount(url, httpPostClientSpy);
    await sut.add(mockAddAccountParams());
  });
});
