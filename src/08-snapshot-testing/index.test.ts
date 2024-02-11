// Uncomment the code below and write your tests
import { generateLinkedList } from './index';
jest.setTimeout(30000);
describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const linkedList = generateLinkedList(['first', null]);
    expect(linkedList).toStrictEqual({
      value: 'first',
      next: {
        value: null,
        next: {
          next: null,
          value: null,
        },
      },
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const linkedList = generateLinkedList([{ a: 'b' }, 'somesh', 5, false]);
    expect(linkedList).toMatchSnapshot();
  });
});
