import { createRequire } from "module";
const require = createRequire(import.meta.url);
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const fs= require('fs');

const json = JSON.parse(fs.readFileSync("conf.json"));
const token = json.token;

// fetch 
const header = {
    "content-type": "application/json",
    key: token
};


export function salvaDati(dati, chiaveBody) {
    return new Promise((resolve, reject) => {
      fetch("https://ws.progettimolinari.it/cache/set", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "key": token
        },
        body: JSON.stringify({
          key: chiaveBody,
          value: JSON.stringify(dati)
        })
      })
        .then(response => {
          if (response.ok) {
            resolve('Dati caricati con successo.');
          } else {
            throw new Error('Errore durante il caricamento.');
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  };


// richiesta informazioni
const readline = require ('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Inserire chiave: ', chiave => {
    console.log('Chiave: ' + chiave);
    readline.question('Inserire valore: ',  val=> {
        console.log('Valore: '+val);
        salvaDati(chiave, val);
        readline.close();
    })
})


