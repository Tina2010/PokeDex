// List of pokémon examples + types + height for output in a loop in the next step
let pokemonRepository = (function () {
    let pokemonList = [
        { name: 'Butterfree', types: ['Bug', 'Flying'], height: 4 },
        { name: 'Charizard', types: ['Fire', 'Fyling'], height: 18 },
        { name: 'Nidoqueen', types: ['Poison', 'Ground'], height: 9 }
    ];

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    return {
        add: add,
        getAll: getAll
    }
}
)();

// output of the given list above
pokemonRepository.getAll().forEach(function (pokemon) {

    // if-statement to look for pokemon that are 10 meter tall or taller than that
    if
        (pokemon.height >= 10) {
        document.write(pokemon.name + " is " + pokemon.height + " meter tall." + " - Wow, that's big!" + '<br>')
        // else-statement to use different output for pokemon that are smaller than 10 meter
    } else { document.write(pokemon.name + " is " + pokemon.height + " meter tall." + '<br>') };


});


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

