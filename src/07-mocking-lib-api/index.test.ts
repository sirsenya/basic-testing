// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.setTimeout(30000);

jest.mock('axios');

jest.mock('lodash', () => {
  const originalModule = jest.requireActual('lodash');
  return {
    __esModule: true,
    ...originalModule,
    throttle: jest.fn((fn) => fn),
  };
});
const relativePath = 'todos';

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const spy = jest.fn(() => ({
      get: () => ({ data: '' }),
    }));
    (axios.create as jest.Mock).mockImplementation(spy);
    await throttledGetDataFromApi(relativePath);
    expect(spy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
    spy.mockReset();
  });

  test('should perform request to correct provided url', async () => {
    const spy = jest.fn(() => ({ data: '' }));
    const mockConstructor = jest.fn(() => ({
      get: spy,
    }));
    const relativePath = 'todos';
    (axios.create as jest.Mock).mockImplementation(mockConstructor);
    await throttledGetDataFromApi(relativePath);
    expect(spy).toHaveBeenCalledWith('todos');
  });

  test('should return response data', async () => {
    const spy = jest.fn(() => ({ data: [] }));
    const mockConstructor = jest.fn(() => ({
      get: spy,
    }));
    const relativePath = 'todos';
    (axios.create as jest.Mock).mockImplementation(mockConstructor);
    expect(await throttledGetDataFromApi(relativePath)).toBeTruthy();
  });
});
