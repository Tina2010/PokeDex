//loading page
$(window).on('load', function () {
    $(".loader-wrapper").fadeOut('slow');
});

// List of pokémon examples + types + height for output in a loop in the next step
const pokemonRepository = (function () {
    const pokemonList = [];
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    const searchBar = document.getElementById('searchbar');

    searchBar.addEventListener('input', function () {
        let listPokemon = document.querySelectorAll('button');
        let value = searchBar.value.toUpperCase();

        listPokemon.forEach(function (pokemon) {
            if (pokemon.innerText.toUpperCase().indexOf(value) > -1) {
                pokemon.style.display = '';
            } else {
                pokemon.style.display = 'none';
            }
        });

        // reloading page after value was removed to toggle removing the loader-wrapper
        value.addEventListener('remove', function (pokemon) {
            if (value === " ") {
                location.reload();
            }
        })

    });

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
        let li = document.querySelector('.pokemon-list');
        li.classList.add('text-center');

        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('btn', 'btn-outline-dark', 'm-2', 'col-xl-2', 'col-lg-3', 'col-sm-4', 'col-7', 'text-capitalize', 'pokemonButton');

        li.appendChild(button);

        //click on pokemon(-button) to log details in console
        button.addEventListener('click', function (event) {
            showDetails(pokemon);

            //loading img
            $('.pokemonImg').on('load', function () {
                $(".loader-wrapper1").fadeOut('slow');
            });

        })
    }

    //provides data for displaying the pokemon in my website, "name" for the button and "detailsUrl" for the return of the pokemon details in the log
 
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e)
        })
    }

    // providing details for the output on the console.log

    function loadDetails(item) {
        const url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.weight = details.weight;
            item.types = details.types;
            item.id = details.id;
        }).catch(function (e) {
            console.error(e);
        });
    }

    // log output for clicking on the button above

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    // preparing modal 

    function showModal(pokemon) {
        $('#exampleModal').modal({
            keyboard: false
        })

        //add pokemon name to modal
        let pokemonName = document.querySelector('.modal-title');
        pokemonName.innerText = pokemon.name;

        //create variables for pokemon details
        let pokemonDetails = document.querySelector('.pokemon-details');
        let pokeImg = document.querySelector('.pokemonImg');
        pokeImg.setAttribute('src', pokemon.imageUrl);
        pokeImg.setAttribute('alt', pokemon.name);

        let pokemonHeight = "Height: " + pokemon.height + " meter.";
        let pokemonWeight = "Weight: " + pokemon.weight + " kg.";
        let pokemonTypes = [];
        let pokemonID = "Number: " + pokemon.id;

        Object.keys(pokemon.types).forEach(key => {
            pokemonTypes.push(pokemon.types[key].type.name);
        });

        //add pokemon details to modal
        pokemonDetails.innerHTML =
            pokemonHeight + '<br>' + pokemonWeight + '<br>' + "Type(s): " + pokemonTypes + '<br>' + pokemonID;
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal
    }

})();

// output of the given list above
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});