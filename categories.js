let fs = require('fs');

// parse merged file (original json with heights, now has added file names)
var allSculptures = [];
var sculptures = fs.readFileSync('clippedFileAndHeight.json');
allSculptures = JSON.parse(sculptures);
// console.log(allSculptures.length);

// narrow down this to only sculptures that were clipped - figure out why this # is 1736, but there are only 1607 clipped images?
var clippedSculptures = []
allSculptures.forEach(sculpture => {
    if (sculpture.boundingRectHeightRatio) {
        clippedSculptures.push(sculpture)
    }
});

console.log(clippedSculptures.length);

// create variables to hold sculptures of different sizes 
var extraSmallSculptures = [];
var smallSculptures = [];
var mediumSculptures = [];
var largeSculptures = [];
var extraLargeSculptures = [];

// loop through sculpture objects and categorize (add group to clipped sculptures objects, and also push to array for each category)
clippedSculptures.forEach(sculpture => {
 if (sculpture.height <= 10) {
  sculpture.group = "extraSmall";
  extraSmallSculptures.push(sculpture);
 } else if (sculpture.height > 10 && sculpture.height <= 50) {
  sculpture.group = "small"
  smallSculptures.push(sculpture);
 } else if (sculpture.height > 50 && sculpture.height <= 100) {
  sculpture.group = "medium";
  mediumSculptures.push(sculpture);
 } else if (sculpture.height > 100 && sculpture.height <=200) {
  sculpture.group = "large";
  largeSculptures.push(sculpture);
 } else {
  sculpture.group = "extraLarge";
  extraLargeSculptures.push(sculpture);
 }
});

// console.log("*****");
// console.log(extraSmallSculptures.length);
// console.log("*****");
// console.log(smallSculptures.length);
// console.log("*****");
// console.log(mediumSculptures.length);
// console.log("*****");
// console.log(largeSculptures.length);
// console.log("*****");
// console.log(extraLargeSculptures.length);

/* Console.log results ---->
1736
*****
293
*****
950
*****
345
*****
125
*****
23
------> */