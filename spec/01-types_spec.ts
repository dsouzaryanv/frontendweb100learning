describe('variables and conatnts and stuff', () => {
    describe('declaring variables', () => {
        it('using let to create a binding', () => {
            let name;
            name = 'Joe';
            expect(name).toBe('Joe');
            name = 11;
            expect(name).toBe(11);
        });
        it('some typescript stuff for variables', () => {
            let name: string | number = 'Joe';  //Union Type
            //name = 'Joe';
            expect(name).toBe('Joe');
            name = 11;
            expect(name).toBe(11);
        });
        it('declaring constants', () => {
            const PI = 3.1415927;
            const FAVORITE_NUMBERS = [9, 22, 108];
            //FAVORITE_NUMBERS = [] cant do this 
            FAVORITE_NUMBERS[0] = 10; //can do this
            const MOVIE = {
                title: "The Force Awakens",
                director: 'Abrams'
            };
            MOVIE.director = 'Johnson';
        });
        it('var is still there but it stinks and should not be used', () => {
            if (true) {
                var name = 'Fido'; //This is the thing you should not do. Dont use var in TS or JS
            }
            expect(name).toBe('Fido');
        });
    });

    describe('strings', () => {
        it('delimiting', () => {
            let first = 'Joe',
                last = "Schmidt";
            expect("Joe").toBe(first); //single vs double quotes dont matter
            let msg = 'She told me "Get Lost!"';
            let story = `Chapter 1 
                It was a dark and stormy night`;
            console.log(story);
            let fullName = `That is ${last}, ${first}`;
            expect(fullName).toBe('That is Schmidt, Joe');
        });
    });

});