import { binarySearch } from '../binarySearch';

test('basic', () => {
    expect(binarySearch([], 10)).toBe(-1);
});

test('basic', () => {
    expect(binarySearch([1, 5, 10, 15], 10)).toBe(2);
});

test('basic', () => {
    expect(binarySearch([1, 5, 10.2, 15], 10)).toBe(-1);
});
