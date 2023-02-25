import { faker } from '@faker-js/faker';
import * as Helper from '../support/http-mocks';

export const mockInvalidCredentialsError = (): void => Helper.mockInvalidCredentialsError(/sessions/);

export const mockUnexpectedError = (): void => Helper.mockUnexpectedError(/sessions/, 'POST');

export const mockOk = (): void => Helper.mockOk(/sessions/, 'POST', { token: faker.random.words() })

export const mockInvalidData = (): void => Helper.mockOk(/sessions/, 'POST', { invalidPropertyReturned: faker.random.words() })