import { roundToTwoPlaces } from "./utils";
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
describe('destructuring', () => {
    it('destructuring arrays', () => {
        const friends = ['sean', 'billy', 'david', 'sarah', 'mo'];
        //traditional way
        const f1 = friends[0];
        const f2 = friends[1];
        expect(f1).toBe('sean');
        expect(f2).toBe('billy');

        //destructuring 
        const [d1, d2] = friends;
        expect(d1).toBe('sean');
        expect(d2).toBe('billy');

        const [e1, , e2, ...rest] = friends; //... syntax is called spread
        expect(e1).toBe('sean');
        expect(e2).toBe('david');
        expect(rest).toEqual(['sarah', 'mo']);
    });

    it('destructuring objects', () => {
        const friends = {
            number1: 'sean',
            number2: 'billy',
            number3: 'david',
            number4: 'sarah',
            number5: 'mo'
        }
        const { number1, number2 } = friends;
        expect(number1).toBe('sean');
        expect(number2).toBe('billy');

        const { number4: f1, number5: f2 } = friends;
        expect(f1).toBe('sarah');
        expect(f2).toBe('mo');

        const { number1: n1, ...others } = friends;
        expect(n1).toBe('sean');
        expect(others).toEqual({ number2: 'billy', number3: 'david', number4: 'sarah', number5: 'mo' });
    });
});

describe('array methods', () => {

    it('forEach allows you to look at each member(this does not produce anything as in a new array!', () => {
        numbers.forEach((n) => console.log(n));
    });
    describe('methods that produce a new array', () => {
        it('selecting just specific stuff from an array', () => {
            const evens = numbers.filter(n => n % 2 === 0);
            expect(evens).toEqual([2, 4, 6, 8]);
            expect(numbers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]); //just showing you this so you see it does not change the array
            expect("").toBeFalsy();
            expect(" ").toBeTruthy();
        });

        it('map lets you transform each element of the source array', () => {
            const doubled = numbers.map(n => n * 2);
            expect(doubled).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18]);
        });

        it('a quick practice', () => {
            interface Vehicle {
                vin: string;
                makeAndModel: string;
                mileage: number;
            }
            const vehicles: Vehicle[] = [
                { vin: '9999', makeAndModel: 'Chevy Tahoe', mileage: 182000 },
                { vin: 'aka92', makeAndModel: 'Toyota Prius', mileage: 89999 },
                { vin: 'kduwi', makeAndModel: 'Ford Explorer', mileage: 99998 }
            ];
            // find all the vehicles with < 100_000, but just give me the make and model.
            const result = vehicles //all of the vehicles
                .filter(v => v.mileage < 100_000) //just the vehciles objects with <100_000
                .map(p => p.makeAndModel); //an array of strings that are just to make and model of those

            expect(result).toEqual(['Toyota Prius', 'Ford Explorer']);
        });

        it('another oop example', () => {

            interface FormattedName {
                fullName: string;
                length: number;
            }
            // public FormattedName formatName(string first, string last) {...}
            function formatName(first: string, last: string): FormattedName {
                const fullName = `${last}, ${first}`;
                return { fullName, length: fullName.length };
            }
            const { fullName, length } = formatName('Han', 'Solo'); // destructuring
            expect(fullName).toBe('Solo, Han');
            expect(length).toBe(9);


            const stuff = ['Jeff', 'Gonzalez', 49];
            const [firstName, , age] = stuff;
            expect(firstName).toBe('Jeff');
            expect(age).toBe(49);
        });

        it('another example', () => {
            interface Product {
                id: number;
                description: string;
                cost: number;
            }

            const products: Product[] = [
                { id: 1, description: 'Eggs', cost: 1.99 },
                { id: 2, description: 'Beer', cost: 7.99 },
                { id: 3, description: 'Chips', cost: 2.99 },
            ];

            // our price markup is 30%.
            // for each product create an array of objects that look like this:
            interface SaleItem {
                id: number;
                description: string;
                price: number;
            }

            // but only if the price is > $5.00
            function makeSaleItemFromProduct(product: Product): SaleItem {
                const result: SaleItem = {
                    id: product.id,
                    description: product.description,
                    price: roundToTwoPlaces(product.cost)
                };
                return result;
            }

            function highPricedItems(item: SaleItem) {
                return item.price > 5.00;
            }
            const answer: SaleItem[] = products
                .map(makeSaleItemFromProduct).filter(highPricedItems);

            expect(answer).toEqual([{
                id: 2, description: 'Beer', price: 10.39
            }]);
        });

        it('Cats are people too man...', () => {
            interface People {
                firstName: string;
                lastName: string;
                age: number;
                isACat: boolean;
            }
            interface CatPeople {
                firstName: string;
                lastName: string;
                age: number;
            }
            interface NonCatPeople {
                firstName: string;
                lastName: string;
                age: number;
            }
            const people = [
                { firstName: 'Greg', lastName: 'Noble', age: 31 },
                { firstName: 'Orion', lastName: 'Noble', age: 1, isACat: true },
                { firstName: 'Rachel', lastName: 'Pietrick', age: 29 },
                { firstName: 'Theo', lastName: 'Pietrick', age: 7, isACat: true },
                { firstName: 'Robert', lastName: 'Noble', age: 33 },
                { firstName: 'Brad', lastName: 'Noble', age: 29 }
            ];
            const answer = [
                { firstName: 'Orion', lastName: 'Noble', age: 1, isACat: true }
            ];
            const catsYoungerThanFive = people.filter(p => {
                return p.age < 5 && p.isACat
            });

            // we should get all cats that are younger than 5
            expect(catsYoungerThanFive).toEqual(answer);

            const peopleWhoAreNonCatPeople: NonCatPeople[] = people.filter(p => !p.isACat).map(nonCat => {
                const nonCatMan: NonCatPeople = {
                    firstName: nonCat.firstName,
                    lastName: nonCat.lastName,
                    age: nonCat.age
                };
                return nonCatMan;
            });

            // we should get all people that are not cats
            expect(peopleWhoAreNonCatPeople).toEqual([
                { firstName: 'Greg', lastName: 'Noble', age: 31 },
                { firstName: 'Rachel', lastName: 'Pietrick', age: 29 },
                { firstName: 'Robert', lastName: 'Noble', age: 33 },
                { firstName: 'Brad', lastName: 'Noble', age: 29 }
            ]);

            const peopleWhoAreCatPeople: CatPeople[] = people.filter(p => p.isACat).map(catPerson => {
                const cat: CatPeople = {
                    firstName: catPerson.firstName,
                    lastName: catPerson.lastName,
                    age: catPerson.age
                };
                return cat;
            })

            // we should get all people who are cats
            expect(peopleWhoAreCatPeople).toEqual([
                { firstName: 'Orion', lastName: 'Noble', age: 1 },
                { firstName: 'Theo', lastName: 'Pietrick', age: 7 }
            ]);

            const peopleWhoAreCatPeopleLessThanFive = people.filter(p => {
                return p.isACat && p.age < 5;
            }).map(p => {
                const cat: CatPeople = {
                    firstName: p.firstName,
                    lastName: p.lastName,
                    age: p.age
                }
                return cat;
            });

            // we should get all people who are cats who are less than 5
            expect(peopleWhoAreCatPeopleLessThanFive).toEqual([
                { firstName: 'Orion', lastName: 'Noble', age: 1 }
            ]);
        });
    });
});

describe('methods that produce a single value (scalar) not an array but a single thing', () => {
    it('has methods to check the membership of an array', () => {
        expect(numbers.some(n => n > 8)).toBe(true);
        expect(numbers.every(n => n < 10)).toBe(true);
    });

    it('has reduce', () => {
        expect(numbers.reduce((p, c) => p + c)).toBe(45);
        expect(numbers.reduce((p, c) => p + c, 100)).toBe(145); //you can give the reduce method an initial value for eg. 100
    });
    it('should behave...', () => {
        interface Vehicle {
            vin: string;
            makeAndModel: string;
            mileage: number;
        }
        const vehicles: Vehicle[] = [
            { vin: '9999', makeAndModel: 'Chevy Tahoe', mileage: 182000 },
            { vin: 'aka92', makeAndModel: 'Toyota Prius', mileage: 89999 },
            { vin: 'kduwi', makeAndModel: 'Ford Explorer', mileage: 99998 }
        ];

        // I want the make and model of the car with the highest mileage (don't worry about ties. that can be homework)

        interface TempResult {
            makeAndModel: string;
            mileage: number;
        }
        const initialState: TempResult = {
            makeAndModel: null,
            mileage: -1
        };
        const compare = (state: TempResult, next: Vehicle) => {
            if (next.mileage > state.mileage) {
                return {
                    makeAndModel: next.makeAndModel,
                    mileage: next.mileage
                }
            } else {
                return state;
            }
        }
        const answer = vehicles.reduce(compare, initialState).makeAndModel;
        expect(answer).toBe('Chevy Tahoe');
    });

    it('ok one more example', () => {

        const friends = ['sean', 'billy', 'stacey', 'david'];

        interface Answer {
            list: string;
            numberOfFriends: number;
        }
        const initialState: Answer = {
            list: '',
            numberOfFriends: 0
        }
        const answer = friends
            .map(f => f.toUpperCase())
            .reduce((state, next) => {
                return {
                    list: state.list ? state.list + ' ' + next : next,
                    numberOfFriends: state.numberOfFriends + 1
                }
            }, initialState)

        expect(answer.list).toBe('SEAN BILLY STACEY DAVID');
        expect(answer.numberOfFriends).toBe(4);
    });
    it('final example and I mean it', () => {

        interface Action {
            type: string;
        }

        const stuffThatHappened: Action[] = [
            { type: 'ADDED' },
            { type: 'ADDED' },
            { type: 'SUBTRACTED' },
            { type: 'ADDED' },
        ];

        const initialState = 0;

        const answer = stuffThatHappened.reduce((state, next) => {
            switch (next.type) {
                case 'ADDED': {
                    return state + 1;
                }
                case 'SUBTRACTED': {
                    return state - 1;
                }
            }
        }, initialState)

        expect(answer).toBe(2);
    });
});