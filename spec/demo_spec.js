import { add } from './utils';
describe('some things', () => {

    it('should behave...', () => {
        expect(2 + 2).toBe(4);
    });
    it('can add DELETE ME', () => {
        expect(add(2, 2)).toBe(4);
    });
    it('can add two numbers', () => {
        expect(add(10, 2)).toBe(12); //comment added later
    })
}); 