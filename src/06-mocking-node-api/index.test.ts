// Uncomment the code below and write your tests
import path from 'path';
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
jest.setTimeout(30000);
const fileName = 'somefile.js';

jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const spy = jest.spyOn(global, 'setTimeout');
    const mockFunction = jest.fn();
    doStuffByTimeout(mockFunction, 2000);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(mockFunction, 2000);
    spy.mockReset();
  });

  test('should call callback only after timeout', () => {
    const mockFunction = jest.fn();
    doStuffByTimeout(mockFunction, 2000);
    expect(mockFunction).not.toHaveBeenCalled();
    jest.advanceTimersByTime(2000);
    expect(mockFunction).toHaveBeenCalled();
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const spy = jest.spyOn(global, 'setInterval');
    const mockFunction = jest.fn();
    doStuffByInterval(mockFunction, 2000);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(mockFunction, 2000);
    spy.mockReset();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const timesToRunFunction = 10;
    const interval = 100;
    const mockFunction = jest.fn();
    doStuffByInterval(mockFunction, interval);
    jest.advanceTimersByTime(timesToRunFunction * interval);
    expect(mockFunction).toHaveBeenCalledTimes(timesToRunFunction);
  });
});

describe('readFileAsynchronously', () => {
  // jest.mock('path');
  test('should call join with pathToFile', async () => {
    const spy = jest.spyOn(path, 'join');
    await readFileAsynchronously(fileName);
    expect(spy).toBeCalledWith(__dirname, fileName);
    spy.mockReset();
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);
    const content = await readFileAsynchronously(fileName);
    expect(content).toBeNull();
  });

  test('should return file content if file exists', async () => {
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(true);
    const content = await readFileAsynchronously(fileName);
    expect(typeof content).toBe('string');
  });
});
