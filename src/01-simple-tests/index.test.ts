// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';
jest.setTimeout(30000);
describe('simpleCalculator tests', () => {
  test('should add two numbers', async () => {
    expect(simpleCalculator({ a: 3, b: 5, action: Action.Add })).toBe(8);
  });

  test('should subtract two numbers', async () => {
    expect(simpleCalculator({ a: 3, b: 5, action: Action.Subtract })).toBe(-2);
  });

  test('should multiply two numbers', async () => {
    expect(simpleCalculator({ a: 3, b: 5, action: Action.Multiply })).toBe(15);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 6, action: Action.Divide })).toBe(0.5);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 5, action: Action.Exponentiate })).toBe(
      243,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 5, b: 2, action: '' })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '', b: '', action: Action.Divide })).toBe(
      null,
    );
  });
});
