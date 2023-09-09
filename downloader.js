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
    return new Promise(async (resolve, reject) => {
        try {
                    //Step 1 get iamge url
            let newUrl = await getPokemonPictureUrl(targetID);

            // Step1b get pokemon name
            let pokemonName = await fetch("https://pokeapi.co/api/v2/pokemon/" + targetID).then(async (response) => {
                return await response.json();
            }).then(json => {
                return json.name;
            })
            // Step 2 do the download
            let savedFileLocation = await savingPokemonPictureToDisk(newUrl, `${pokemonName}-${targetID}.png`, "storage");
            //return
            resolve(savedFileLocation)

        } catch (error) {
            reject(error);
        }
    });
}

// Generate a random number or use a user provided number
function getRandomPokemonId(){
    return Math.floor(Math.random() * 1010) + 1
}

// Retrieve pokemon data for that number
// Retrieve the image URL from that pokemon Data
async function getPokemonPictureUrl(targetId = getRandomPokemonId()){

	// Retrieve the API data
	let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + targetId).catch(error => {
		throw new Error("API failure.");
	});

	if (response.status == "404"){
		throw new Error("API did not have data for the requested ID.");
	}

	// Convert the response into usable JSON 
	let data = await response.json().catch(error => {
		throw new Error("API did not return valid JSON.");
	}); 

	// Not optimised, it makes unnecessary variables
	// let imageUrl = data.sprites.other["official-artwork"].front_default;
	// return imageUrl;

	// More-optimised, no extra junk variables
	return data.sprites.other["official-artwork"].front_default;
}

// Download that Image and save it to the computer
// Return the download image's file path
async function savingPokemonPictureToDisk(targetUrl, targetDownloadFilename, targetDownloadDirectory = "."){
    // Fetch request to the image URL
    let imageData = await fetch(targetUrl).catch((error) => {
        throw new Error("Image failed to download.");
    });
    // Check if taget directory exists
    if (!fs.existsSync(targetDownloadDirectory)){
        // Make a directory if we need to 
        await mkdir(targetDownloadDirectory);
    }

    // Create a JS-friendly file path
    let fullFileDestination = path.join(targetDownloadDirectory, targetDownloadFilename);
    // somefolder, CoolPokemon.png
    // /somefolder/CoolPokemon.png


// Stream  the image from the fetch to the computer
    let fileDownloadStream = fs.createWriteStream(fullFileDestination);

    // Get data as bytes from the web request --- pipe the bytes into the hard drive
    await finished(Readable.fromWeb(imageData.body).pipe(fileDownloadStream)).catch(error => {
        throw new Error("Failed to save content to disk.")
    });

// Return the saved image location
    return fullFileDestination;

}


module.exports = {
    donwloadPokemonPicture,
    savingPokemonPictureToDisk,
    getPokemonPictureUrl,
    getRandomPokemonId
}

