let fs = require('fs');

let originalClippedObjectsArray = fs.readFileSync('clippedFileAndHeight.json');
let originalObjects = JSON.parse(originalClippedObjectsArray);
console.log(originalObjects.length);

const folder = '/home/ec2-user/environment/met_sculptures2/resized_clipped_tranparent_png';

var imagesArray = fs.readdirSync(folder);
// console.log(imagesArray);
console.log('***')
console.log(imagesArray.length);

var withFilename = [];
var finalClippedFileAndHeight = [];

for (var i=0;i<originalObjects.length;i++) {
    if (originalObjects[i].fileName) {
        withFilename.push(originalObjects[i]);
    }
};

console.log(withFilename.length);

for (var i=0;i<withFilename.length;i++) {
        for (var x=0;x<imagesArray.length;x++) {
        if (withFilename[i].fileName.split('.')[0] === imagesArray[x].split('.')[0]) {
            finalClippedFileAndHeight.push(withFilename[i]);
        }
    } 
};

console.log(finalClippedFileAndHeight.length);


// originalObjects.forEach(object => {
    
//     imagesArray.forEach(image => {
//         if (object.fileName.split('.')[0] == image.split('.')[0]) {
//             finalClippedFileAndHeight.push(object);
//         }
//     });
// });

