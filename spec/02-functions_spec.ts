import { formatName, formatName2 } from "./utils";
import * as _ from 'lodash';

describe('functions', () => {
    describe('syntax for creating them', () => {
        it('declaring them', () => {
            //Named Function
            function add(a: number, b: number) {
                return a + b;
            }
            expect(add(3, 4)).toBe(7);

            //Anonymous Function
            // an anonymous function that I immediately invoke
            expect((function (a, b) { return a / b; })(10, 5)).toBe(2);

            const multiply = function (a: number, b: number) { return a * b; };
            expect(multiply(3, 4)).toBe(12);

            const divide = (a: number, b: number) => a / b;
            expect(divide(10, 2)).toBe(5);

            const logIt = (msg: string) => {
                msg = msg.toUpperCase();
                console.log(msg);
                return true;
            };
            logIt('Fun with Functions!');
        });

        describe('higher order functions', () => {
            //A higher order function is a function that takes an an argument one or more functions and/or returns a fucntion
            it('first example', () => {
                const answer = formatName('Han', 'Solo', makeItUpper);
                expect(answer).toBe('SOLO, HAN');

                const answer2 = formatName2('Han', "Solo", (x: string) => `***${x}***`)
                expect(answer2).toBe('***Solo, Han***');

                function makeItUpper(what: string) {
                    return what.toUpperCase();
                }
            });
        });

        describe('a function that returns a function', () => {
            it('a way to do it that does not crazy', () => {
                //<h1>Hello</h1>
                //tag, content
                //straighta head procedural function thing
                function makeElement(tag: string, content: string) {
                    return `<${tag}>${content}</${tag}>`;
                }
                expect(makeElement('h1', 'Hello')).toBe('<h1>Hello</h1>');
                expect(makeElement('p', 'the story')).toBe('<p>the story</p>');
            });
            it('you could try OOP', () => {
                class ElementMaker {
                    tag: string;
                    constructor(tag: string) {
                        this.tag = tag;
                    }
                    make(content: string) {
                        return `<${this.tag}>${content}</${this.tag}>`;
                    }
                }
                const h1Maker = new ElementMaker('h1');
                expect(h1Maker.make('hello')).toBe('<h1>hello</h1>');
                expect(h1Maker.make('big!')).toBe('<h1>big!</h1>');
            });
            it('a higher order function version ', () => {
                function tagMaker(tag: string) {
                    return (content: string) => `<${tag}>${content}</${tag}>`;
                }
                const h1Maker = tagMaker('h1');
                const pMaker = tagMaker('p');

                expect(h1Maker('big!')).toBe('<h1>big!</h1>');
                expect(pMaker('small')).toBe('<p>small</p>');
            });
        });

    });

    describe('some lodash goodness', () => {
        it('supports memoization', () => {
            function doSomeHardWork() {
                console.log('Doing some hard work here ');
                return 'Work is Done';
            }
            const memo = _.memoize(doSomeHardWork);
            expect(memo()).toBe('Work is Done');
            expect(memo()).toBe('Work is Done');
            expect(memo()).toBe('Work is Done');
            expect(memo()).toBe('Work is Done');
            expect(memo()).toBe('Work is Done');
            expect(memo()).toBe('Work is Done');
            expect(memo()).toBe('Work is Done');
        });

        it('currying', () => {
            function makeElement(tag: string, content: string) {
                return `<${tag}>${content}</${tag}>`;
            }
            const curriedTagMaker = _.curry(makeElement);
            const h1Maker = curriedTagMaker('h1');
            const pMaker = curriedTagMaker('p');

            expect(h1Maker('HELLO')).toBe('<h1>HELLO</h1>');
            expect(pMaker('see you later')).toBe('<p>see you later</p>');

            function add(a: number, b: number, c: number) {
                return a + b + c;
            }

            const curriedAdd = _.curry(add);
            const f1 = curriedAdd(10, 5);
            expect(f1(2)).toBe(17);
        });
    });
});