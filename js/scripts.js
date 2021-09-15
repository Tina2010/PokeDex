// List of pokémon examples + types + height for output in a loop in the next step
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    //add one pokemon at the time
    function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log("Fetched Pokemon is wrong.")
        }
    }

    // now GET ALL pokemon-objects from pokemonList
    function getAll() {
        return pokemonList;
    }

    // adds button for each pokemon from the API

    function addListItem(pokemon) {
        let ul = document.querySelector('.pokemon-list');
        let liItem = document.createElement('li');

        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class');

        liItem.appendChild(button);
        ul.appendChild(liItem);

        //click on pokemon(-button) to log details in console
        button.addEventListener('click', function (event) {
            showDetails(pokemon)
        })
    }

    //provides data for displaying the pokemon in my website, "name" for the button and "detailsUrl" for the return of the pokemon details in the log
 
    function loadList() {
        showLoadingMessage();
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            hideLoadingMessage();
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            hideLoadingMessage();
            console.error(e)
        })
    }

    // providing details for the output on the console.log

    function loadDetails(item) {
        let url = item.detailsUrl;
        showLoadingMessage();
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            hideLoadingMessage();
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.weight = details.weight;
            item.types = details.types;
            item.id = details.id;
        }).catch(function (e) {
            hideLoadingMessage();
            console.error(e);
        });
    }

    // log output for clicking on the button above

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    let modalContainer = document.querySelector('#modal-container');

    // preparing modal 

    function showModal(pokemon) {
        let modalContainer = document.querySelector('#modal-container');

        //remove existing modal content
        modalContainer.innerHTML = '';

        //creating the modal
        let modal = document.createElement('div');
        modal.classList.add('modal');

        // adding close button to modal window
        let closeButton = document.createElement('button');
        closeButton.classList.add('modal-close');
        closeButton.innerText = 'Close';
        // click on Close to close modal window
        closeButton.addEventListener('click', hideModal);

        //add pokemon name to modal
        let pokemonName = document.createElement('h1');
        pokemonName.innerText = pokemon.name;

        //create variables for pokemon details
        let pokemonDetails = document.createElement('p');
        let pokemonHeight = "Height: " + pokemon.height + " meter.";
        let pokemonWeight = "Weight: " + pokemon.weight + " kg.";
        let pokemonTypes = [];
        let pokemonID = "Number: " + pokemon.id;
        var lineBreak = '<br/>';

        Object.keys(pokemon.types).forEach(key => {
            pokemonTypes.push(pokemon.types[key].type.name);
        });

        //add pokemon details to modal
        pokemonDetails.innerHTML =
            pokemonHeight + '<br>' + pokemonWeight + '<br>' + "Type(s): " + pokemonTypes + '<br>' + pokemonID;

        //adding pokemon img
        let pokeImg = document.createElement('img');
        pokeImg.setAttribute('src', pokemon.imageUrl);
        pokeImg.setAttribute('alt', pokemon.name);

        //marry the modal with its content
        modal.appendChild(closeButton);
        modal.appendChild(pokeImg);
        modal.appendChild(pokemonName);
        modal.appendChild(pokemonDetails);
        modalContainer.appendChild(modal);

        //placing modal in front of pokemon-list
        modalContainer.classList.add('is-visible');
    }

    //commanding to hide modal

    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    // "Loading..." appears when you click on a pokemon and hiddes, when the pokedetails are loaded

    function showLoadingMessage() {
        document.querySelector('.loading-message').classList.add('visible');
    }

    function hideLoadingMessage() {
        document.querySelector('.loading-message').classList.add('hidden');
    }


    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    }
}
)();

// output of the given list above
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
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

