// Synchronous library for doing IO
// Check if directory exists
const fs = require("node:fs");

//Asynchronous, making a directory can take time
// but we do want to wait for this to finish
const {mkdir} = require("node:fs/promises");

// Streaming data const {readable}
// This is synchronous, so we wait and it is bloking
const { Readable } = require("node:stream");

//Wait for straming to finish, this can take time so it should be a promise
// but shouldn;t be blocking, so it is a promise insterad of async
const {finished} = require("node:stream/promises");

// Node file & directory path helper system
// /folder/folder/filename.png
// \folder\folder\filename.png
const path = require("node:path");

function donwloadPokemonPicture(targetID = getRandomPokemonId()){

}

// Generate a random number or use a user provided number
function getRandomPokemonId(){
    return Matgh.floor(Math.random() * 1010) + 1
}

// Retrieve pokemon data for that number
// Retrieve the image URL from that pokemon Data
async function getPokemonPictureUrl(targetId = getRandomPokemonId()){
    
    // Retrieve the API data
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + targetId).catch(error => {
        throw new Error("API failure.");
    });

    if (response.status == "404") {
        throw new Error("API did not ahve data for the requested ID.");
    }

    // Convert the response int o usable JSON
    let data = await response.json().catch(error => {
        throw new Error("API did not return valid JSON.");
    });

        // Not optimised, it makes unnessary vairalsbs
    // let imageUrl = data.sprites.other["official-artwork"].front_shiny; //default
    // return imageUrl;

    // Optimsed, no extra junk vairables
    return data.sprites.other["offical-artwork"].fron_shiny;

}

// Download that Image and save it to the computer
// Return the download image's file path
async function savingPokemonPictureToDisk(targetUrl, targetDownloadFilename, targetDownloadDirectory = "."){

}


module.exports = {
    donwloadPokemonPicture,
    savingPokemonPictureToDisk,
    getPokemonPictureUrl,
    getRandomPokemonId
}

