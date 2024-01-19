/** Command-line tool to generate Markov text. */

const fs = require('fs');
const {MarkovMachine} = require('./markov');
const process = require('process');
const axios = require('axios');

function instantiateMm(text) {
    let mm = new MarkovMachine(text);
    console.log(mm.makeText());
}


function makeText(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Cannot read file ${path}, ${err}`);
            process.exit(1);
        } else {
            instantiateMm(data);
        }
    });
}

async function urlText(url) {
    try {
        let response = await axios.get(url);
        instantiateMm(response.data);
    } catch (err) {
        console.error(`Cannot read url ${url} ${err}`);
        process.exit(1);
    }
}

let method = process.argv[2];
let path = process.argv[3];

if (method === 'file') {
    makeText(path);
} else if (method === 'url') {
    urlText(path);
} else {
    console.error('Invalid method');
    process.exit(1);
}
