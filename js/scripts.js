// List of pokémon examples + types + height for output in a loop in the next step
let pokemonRepository = (function () {
    let pokemonList = [
        { name: 'Butterfree', types: ['Bug', 'Flying'], height: 4 },
        { name: 'Charizard', types: ['Fire', 'Fyling'], height: 18 },
        { name: 'Nidoqueen', types: ['Poison', 'Ground'], height: 9 }
    ];

    function addListItem(pokemon) {
        let ul = document.querySelector('.pokemon-list');
        let liItem = document.createElement('li');

        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class');

        liItem.appendChild(button);
        ul.appendChild(liItem);

        button.addEventListener('click', function () {
            showDetails(pokemon)
        })

    }

    function showDetails(pokemon) {
        console.log(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    }
}
)();

// output of the given list above
pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
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

