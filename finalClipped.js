// load a default library that lets us read/write to the file system
let fs = require('fs');


var oldJSON = fs.readFileSync('clippedFileAndHeight.json');
var oldSculptures = JSON.parse(oldJSON);
console.log(oldSculptures.length);

var newJSON = fs.readFileSync('finalClippedSculptures.json');
var finalClippedImages = JSON.parse(newJSON);
console.log(finalClippedImages.length);


var finalClippedImageSculptures = [];


finalClippedImages.forEach(image => {

  oldSculptures.forEach(sculpture => {
    if (image == sculpture.fileName) {
     
     finalClippedImageSculptures.push(sculpture);

    }
  });

});


console.log(finalClippedImageSculptures.length);


fs.writeFileSync('finalClippedFileAndHeight.json', JSON.stringify(finalClippedImageSculptures), 'utf8');
