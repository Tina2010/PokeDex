// List of pok�mon examples + types + height for output in a loop in the next step
let pokemonList = [
    { name: 'Butterfree', types: ['Bug','Flying'], height: 4 },
    { name: 'Charizard', types: ['Fire', 'Fyling'], height: 18 },
    { name: 'Nidoqueen', types: ['Poison', 'Ground'], height: 9 }
];

// output of the given list above
for (let i = 0; i < pokemonList.length; i++) {
    document.write(pokemonList[i].name + " is " + pokemonList[i].height + " meter tall." + '<br>');
}


/*
let simpleAddition = 4 + 5;
document.write(simpleAddition);

let size = 45;
let doubleSize = size * 2;
document.write(doubleSize);

let minSize = (doubleSize * 2) - (size / 2);
document.write(minSize);


// for pop-ups:
alert('Hello world');

// "let" creates a variable:
let age;
age = 35;

let name;
name = 'Lisa';

// declaring ageOfLisa to use value of age:
let ageOfLisa = age;
 */

