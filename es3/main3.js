
const fs= require('fs');
// prendere file
fs.readFile("660000_parole_italiane.txt", (error, data) => {
if (error) {
throw error;
}

// richiesta parola
const readline = require ('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

let trovata = false;

readline.question('Inserire parola: ', parola => {
    console.log('Parola da cercare: '+parola);
    readline.close();
    console.log(parola.substring(parola.length-3));
    // controllo rima
    let arrayParole = data.toString().split("\n");
    let arrayTrovate = [];
    
    for(let i=0; i<arrayParole.length; i++){
        if(arrayParole[i].substring(arrayParole[i].length-3) === parola.substring(parola.length-3)){
            console.log(arrayParole[i]);
            arrayTrovate.push(arrayParole[i]); // elenco elementi trovati
            trovata=true;
        }
    }
    console.log("Parole trovate: "+arrayTrovate.length);

    if(!trovata){
        console.log("Nessuna rima trovata");
    }
})
//console.log(data.toString());
});

