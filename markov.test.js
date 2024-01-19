const { MarkovMachine } = require('./markov');

describe('MarkovMachine', function () {
    test('make markov machine', function () {
        let text = 'the cat in the hat';
        let mm = new MarkovMachine(text);

        expect(mm).toBeInstanceOf(MarkovMachine);
    });

    test('create chains', function () {
        let text = 'the cat in the hat';
        let mm = new MarkovMachine(text);

        let expectedChain = {
            'the': ['cat', 'hat'],
            'cat': ['in'],
            'in': ['the'],
            'hat': []
        };

        expect(mm.chain).toEqual(expectedChain);
    });

    test('make text', function () {
        let text = 'the cat in the hat';
        let mm = new MarkovMachine(text);

        let madeText = mm.makeText();

        expect(madeText.length).toBeGreaterThan(0);
    });

    test('make specific number of words', function () {
        let text = 'the cat in the hat';
        let mm = new MarkovMachine(text);

        let numWords = 5;
        let madeText = mm.makeText(numWords);

        expect(madeText.split(' ').length).toBe(numWords);
    })
})