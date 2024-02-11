// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

jest.setTimeout(30000);

describe('resolveValue', () => {
  const value = NaN;
  test('should resolve provided value', async () => {
    expect(await resolveValue(value)).toBe(value);
  });
});

describe('throwError', () => {
  const message: string = 'error message';
  test('should throw error with provided message', () => {
    expect.assertions(1);
    try {
      throwError(message);
    } catch (error) {
      expect(error).toEqual(Error(message));
    }
  });

  test('should throw error with default message if message is not provided', () => {
    expect.assertions(1);
    try {
      throwError();
    } catch (error) {
      expect(error).toEqual(Error('Oops!'));
    }
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect.assertions(1);
    try {
      throwCustomError();
    } catch (error) {
      expect(error).toEqual(new MyAwesomeError());
    }
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
