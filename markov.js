/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chain = {};

    for (let i = 0; i < this.words.length; i += 1) {
      let currentWord = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if (!chain[currentWord]) {
        chain[currentWord] = [];
      }

      if (nextWord) {
        chain[currentWord].push(nextWord);
      }
    }
    this.chain = chain;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let keys = Object.keys(this.chain);
    let firstWordSelection = keys[Math.floor(Math.random() * keys.length)];
    let firstWord = [firstWordSelection];
    let outputText = [];

    while (firstWord && outputText.length < numWords) {
      outputText.push(firstWord);
      let nextWords = this.chain[firstWord];
      if (nextWords && nextWords.length > 0) {
        firstWord = nextWords[Math.floor(Math.random() * nextWords.length)];
      } else {
        firstWord = null;
      }
    }
    return outputText.join(' ');
  }
}

module.exports = {
  MarkovMachine
};