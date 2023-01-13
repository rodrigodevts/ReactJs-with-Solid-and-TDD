import { faker } from '@faker-js/faker';
import { HttpPostParams } from '../protocols/http/http-post-client';

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: {
    name: faker.internet.userName,
  },
});
