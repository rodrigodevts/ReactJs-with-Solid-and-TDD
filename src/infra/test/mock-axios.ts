import axios from 'axios';
import { faker } from '@faker-js/faker';

const mockHttpResponse = (): any => ({
  data: {
    name: faker.internet.userName,
  },
  status: faker.random.numeric,
});

const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.post.mockResolvedValue(mockHttpResponse());

  return mockedAxios;
};

export { mockAxios, mockHttpResponse };
