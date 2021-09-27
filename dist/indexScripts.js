$(window).on("load", (function () { $(".loader-wrapper").fadeOut("slow") })); const pokemonRepository = function () { const e = [], t = document.getElementById("searchbar"); function n(t) { "object" == typeof t && "name" in t ? e.push(t) : console.log("Fetched Pokemon is wrong.") } function o(e) { const t = e.detailsUrl; return fetch(t).then((function (e) { return e.json() })).then((function (t) { e.imageUrl = t.sprites.front_default, e.height = t.height, e.weight = t.weight, e.types = t.types, e.id = t.id })).catch((function (e) { console.error(e) })) } function i(e) { o(e).then((function () { r(e) })) } function r(e) { $("#exampleModal").modal({ keyboard: !1 }), document.querySelector(".modal-title").innerText = e.name; let t = document.querySelector(".pokemon-details"), n = document.querySelector(".pokemonImg"); n.setAttribute("src", e.imageUrl), n.setAttribute("alt", e.name), $(".pokemonImg").each((function () { $(".loader-wrapper1").fadeIn("fast"), n.onload = function () { console.log("done!"), $(".loader-wrapper1").fadeOut("slow") }, console.log("not done!") })); let o = "Height: " + e.height + " meter.", i = "Weight: " + e.weight + " kg.", r = [], l = "Number: " + e.id; Object.keys(e.types).forEach((t => { r.push(e.types[t].type.name) })), t.innerHTML = o + "<br>" + i + "<br>Type(s): " + r + "<br>" + l } return t.addEventListener("input", (function () { let e = document.querySelectorAll("button"), n = t.value.toUpperCase(); e.forEach((function (e) { e.innerText.toUpperCase().indexOf(n) > -1 ? e.style.display = "" : e.style.display = "none" })) })), { add: n, getAll: function () { return e }, addListItem: function (e) { let t = document.querySelector(".pokemon-list"); t.classList.add("text-center"); let n = document.createElement("button"); n.innerText = e.name, n.classList.add("btn", "btn-outline-dark", "m-2", "col-xl-2", "col-lg-3", "col-sm-4", "col-7", "text-capitalize", "pokemonButton"), t.appendChild(n), n.addEventListener("click", (function (t) { i(e) })) }, loadList: function () { return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then((function (e) { return e.json() })).then((function (e) { e.results.forEach((function (e) { n({ name: e.name, detailsUrl: e.url }) })) })).catch((function (e) { console.error(e) })) }, loadDetails: o, showDetails: i, showModal: r } }(); pokemonRepository.loadList().then((function () { pokemonRepository.getAll().forEach((function (e) { pokemonRepository.addListItem(e) })) }));