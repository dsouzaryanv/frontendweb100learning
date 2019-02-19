describe('Writing a basic spec', () => {
    it('should be easy', () => {
        //Given (arrange)
        let firstName = 'Boba',
            lastName = 'Fett';
        //When (act)
        let fullName = lastName + ', ' + firstName;
        //Then (assert)
        expect(fullName).toBe('Fett, Boba');
    });
});