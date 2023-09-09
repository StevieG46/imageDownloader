const { donwloadPokemonPicture } = require("./downloader.js");

donwloadPokemonPicture().then(savedFileOutput => {
    console.log("New image is saved to " + savedFileOutput)
}).catch(error => {
    console.log(error);
})

// async function exampleDownload(){
//     let savedFileOutput = await donwloadPokemonPicture();
//     console.log("New image is async savbed to: " + savedFileOutput)
// }
// exampleDownload();


