/*global d3 */

 d3.json(
  "finalClippedFileAndHeight.json"
 ).then(sculptures => {


// narrow down this to only sculptures that were clipped - figure out why this # is 1736, but there are only 1607 clipped images?
let clippedSculptures = []


for (var i=0; i<sculptures.length; i++) {
 if (sculptures[i].boundingRectHeightRatio){
  sculptures[i].fileNamePNG = sculptures[i].fileName.split('.')[0] + '.png'
  clippedSculptures.push(sculptures[i]);
 }
}


console.log(clippedSculptures.length);

// create variables to hold sculptures of different sizes
let extraSmallSculptures = [];
let smallSculptures = [];
let mediumSculptures = [];
let largeSculptures = [];
let extraLargeSculptures = [];

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

console.log("*****");
console.log(extraSmallSculptures.length);
console.log("*****");
console.log(smallSculptures.length);
console.log("*****");
console.log(mediumSculptures.length);
console.log("*****");
console.log(largeSculptures.length);
console.log("*****");
console.log(extraLargeSculptures.length);

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






// var myImage = document.getElementById("mainImage");
// scaled images
let mainSmall = document.querySelector(".mainSmallImage");
console.log(mainSmall);

let myImageMedium = document.querySelector(".mainMediumImage");
console.log(myImageMedium);

let myImageLarge = document.querySelector(".mainLargeImage");
console.log(myImageLarge);


// overview images without scale
let overviewSmall = document.querySelector(".overviewSmallImage");
console.log(overviewSmall);

let overviewMedium = document.querySelector(".overviewMediumImage");
console.log(overviewMedium);

let overviewLarge = document.querySelector(".overviewLargeImage");
console.log(overviewLarge);


let imageIndex = 1;
let baseHeight = 3;
let overviewWidth = '180px'

var odW = '20%'
var odH = '90%'

// sculpture descriptions
var smallOverviewDescription = d3.select('.sculptureDescriptionSmall')
 .append('smallOverviewDescription')
   .attr('width', odW)
   .attr('height', odH)
   .append('g');

var mediumOverviewDescription = d3.select('.sculptureDescriptionMed')
 .append('mediumOverviewDescription')
   .attr('width', odW)
   .attr('height', odH)
   .append('g');

var largeOverviewDescription = d3.select('.sculptureDescriptionLarge')
 .append('largeOverviewDescription')
   .attr('width', odW)
   .attr('height', odH)
   .append('g');

function changeSmall(){
 imageIndex++;

 mainSmall.setAttribute("src", "resized_clipped_tranparent_png/" + smallSculptures[imageIndex].fileNamePNG);
 overviewSmall.setAttribute("src", "resized_clipped_tranparent_png/" + smallSculptures[imageIndex].fileNamePNG);

 mainSmall.style.height = baseHeight * smallSculptures[imageIndex].height + 'px';
 // mainSmall.style.height = baseHeight * smallSculptures[imageIndex].height + '%'; //safari
 overviewSmall.style.maxWidth = overviewWidth;
 overviewSmall.style.height = 'auto';

 smallOverviewDescription
 .html(`<b>${smallSculptures[imageIndex].Title}</b> (${smallSculptures[imageIndex].endDate})<br/><br/><b>${smallSculptures[imageIndex].height} cm | ${(smallSculptures[imageIndex].height * 0.393701).toFixed(2)} inches</b><br/><br/>${smallSculptures[imageIndex].Medium}<br/><br/>${smallSculptures[imageIndex].Culture}`)
 .attr('class', 'sculptureDescriptionSmall');
 // .style('float', 'left')
 // .style('margin-left', '5%')
 // .style('margin-top', '90%');


 if (imageIndex > smallSculptures.length) {
   imageIndex = 0;
 }
}

window.changeSmall = changeSmall;


function changeMedium(){

 imageIndex++;

 myImageMedium.setAttribute("src", "resized_clipped_tranparent_png/" + mediumSculptures[imageIndex].fileNamePNG);
 overviewMedium.setAttribute("src", "resized_clipped_tranparent_png/" + mediumSculptures[imageIndex].fileNamePNG);


 myImageMedium.style.height = baseHeight *mediumSculptures[imageIndex].height + 'px';
 // myImageMedium.style.height = baseHeight *mediumSculptures[imageIndex].height + '%'; //safari
 overviewMedium.style.maxWidth = overviewWidth;
 overviewMedium.style.height = 'auto';


mediumOverviewDescription
 .html(`<b>${mediumSculptures[imageIndex].Title}</b> (${mediumSculptures[imageIndex].endDate})<br/><br/><b>${mediumSculptures[imageIndex].height} cm | ${(mediumSculptures[imageIndex].height * 0.0328084).toFixed(2)} feet</b><br/><br/>${mediumSculptures[imageIndex].Medium}<br/><br/>${mediumSculptures[imageIndex].Culture}`)
 .attr('class', 'sculptureDescriptionMed');
 // .style('left', '35%')
 // .style('top', '90%');

 if (imageIndex > mediumSculptures.length) {
   imageIndex = 0;
 }
}

window.changeMedium = changeMedium;

function changeLarge(){

 imageIndex++;

 myImageLarge.setAttribute("src", "resized_clipped_tranparent_png/" + largeSculptures[imageIndex].fileNamePNG);
 overviewLarge.setAttribute("src", "resized_clipped_tranparent_png/" + largeSculptures[imageIndex].fileNamePNG);


 console.log(largeSculptures[imageIndex].height)
 myImageLarge.style.height = baseHeight * largeSculptures[imageIndex].height + 'px';
 // myImageLarge.style.height = baseHeight * largeSculptures[imageIndex].height + '%'; //works as % in safari, not chrome
 overviewLarge.style.maxWidth = overviewWidth;
 overviewLarge.style.height = 'auto';

largeOverviewDescription
 .html(`<b>${largeSculptures[imageIndex].Title}</b> (${largeSculptures[imageIndex].endDate})<br/><br/><b>${largeSculptures[imageIndex].height} cm | ${(largeSculptures[imageIndex].height * 0.0328084).toFixed(1)} feet</b><br/><br/>${largeSculptures[imageIndex].Medium}<br/><br/>${largeSculptures[imageIndex].Culture}`)
 .attr('class', 'sculptureDescriptionLarge');
 // .style('left', '50%')
 // .style('top', '90%');

 if (imageIndex > largeSculptures.length) {
   imageIndex = 0;
 }
}

window.changeLarge = changeLarge;


changeSmall();
changeMedium();
changeLarge();

// user height
// let userFeet = document.querySelector("#feet");
// let userInches = document.querySelector("#inches");

// let userHeight = (userFeet * 30.48) + (userInches * 2.54)

// console.log(userHeight);


 });









// // quantitative viz

// d3.csv(
//   "data/MetSculpturesMenWom.csv"
//  ).then(data => {
//   //  console.log(data)
//   //  data[0].Dimensions

//   // *** create variable to store column header names for reference
//   var headerNames = d3.keys(data[0]);
//   //  console.log(headerNames);


//   // *** create variable to hold original dimensions data
//   for (var i = 0; i < data.length; i++) {
//    var sculptureDimension = data[i].Dimensions
//    //  console.log(sculptureDimension);

//    // *** regular expression to match the height in cm (pattern for most of the dimension entries)
//    var regexCm = /(?<=\(\s?)(\d*\.?\d*)([^\s?cm])/g;
//    var foundCm = sculptureDimension.match(regexCm);

//    if (foundCm) {
//     foundCm = foundCm[0];
//     if (foundCm[0].match(/[a-zA-Z]+/)) {
//      foundCm = foundCm[1];
//     }
//     foundCm = parseInt(foundCm);
//     //  console.log(foundCm)
//    }
//    foundCm = parseInt(foundCm)


//    data[i].height = foundCm;
//    //  console.log(data[i].height);


//    //  console.log(found);

//    // *** not all entries match the same pattern above, log all those that don't match
//    if (foundCm === null) {
//     //  console.log(data[i].Dimensions);

//     // *** for those that match the '33-1/2' pattern - split on the first whitespace to return this string (still need to address additional inch patterns)
//     var foundIn = sculptureDimension.split(' ')[1];
//     //  console.log(foundIn);

//     // *** if follows '33-1/2' pattern (does not return undefined), then split again on '-'
//     if (foundIn != undefined) {

//      var foundInSplit = foundIn.split('-');

//      // *** create another regex to recognize if array element in position 1 (where fraction is stored) contains a digit, if this is true and is also not undefined then replace fraction with an array split on '/'
//      var digit = /\d+/;
//      if (digit.test(foundInSplit[1]) && foundInSplit != undefined) {
//       foundInSplit.splice(1, 1, foundInSplit[1].split('/'));
//       //  console.log(foundInSplit);

//       // *** replace sub array in position 1 of foundInSplit array with a decimal (numerator in pos 0 of sub array / denominator in pos 1 of sub array)
//       foundInSplit.splice(1, 1, foundInSplit[1][0] / foundInSplit[1][1]);
//       //  console.log(foundInSplit);

//       // convert string of digits in pos 0 of foundInSplit array to integers
//       foundInSplit.splice(0, 1, parseInt(foundInSplit[0], 10));
//       //  console.log(foundInSplit);

//       // add integer and decimal to form one inch value
//       foundInSplit.splice(0, 2, foundInSplit[0] + foundInSplit[1]);
//       //  console.log(foundInSplit);

//       // create var to hold converted height from inches to cm
//       var cmConverted = foundInSplit[0] * 2.54;
//       //  console.log(cmConverted);

//       data[i].height = cmConverted;
//       //  console.log(data[i].height);
//      }
//     }
//    }
//   }




//   //  *** create variable to hold gender tag data
//   for (var i = 0; i < data.length; i++) {
//    var sculptureGender = data[i].Tags
//    //  console.log(sculptureGender);

//    // *** create regex for men and women tags
//    var regexMen = /Men\s?/g;
//    var regexWomen = /Women\s?/g;

//    // *** create variable to hold scultpures that have both men and women tags
//    if (sculptureGender.match(regexMen) && sculptureGender.match(regexWomen)) {
//     //  console.log(sculptureGender);
//     var menAndWomen = sculptureGender;
//     //  console.log(menAndWomen);
//     data[i].gender = 'b'
//    }
//    else {
//     // *** create variable to hold sculptures that have a single gender tag
//     var singleGender = sculptureGender
//     //  console.log(singleGender);
//    }
//    // *** create variable for sculptures with men tag only
//    if (regexMen.test(singleGender)) {
//     //  console.log(singleGender);
//     var men = singleGender;
//     //  console.log(men);
//     data[i].gender = 'm'
//    }
//    // *** create variable for sculptures with women tag only
//    if (regexWomen.test(singleGender)) {
//     //  console.log(singleGender);
//     var women = singleGender;
//     //  console.log(women);
//     data[i].gender = 'w'
//    }
//    //  console.log(data[i].gender);

//   }




//   //  *** create variable to hold end date
//   for (var i = 0; i < data.length; i++) {
//    var sculptureEndDate = data[i]["Object End Date"];
//    //  console.log(sculptureEndDate);

//    sculptureEndDate = parseInt(sculptureEndDate, 10)
//    //  console.log(sculptureEndDate);

//    data[i].endDate = sculptureEndDate;
//   }

//   // *** create variable to hold all final objects
//   var sculpturesHeightGenderDate = [];

//   for (var i = 0; i < data.length; i++) {
//    var sculpture = data[i]
//    if (!isNaN(sculpture.height) && sculpture.gender && sculpture.endDate) {
//     sculpturesHeightGenderDate.push(sculpture)
//    }
//   }

//   console.log(sculpturesHeightGenderDate);

//   // *** begin drawing:

//   var width = 1200
//   var height = 800
//   var plotWidth = 950
//   var plotHeight = 460
//   var padding = 45
//   const colorValue = sculpturesHeightGenderDate => sculpturesHeightGenderDate.gender;
//   const colorLabel = 'Gender';
//   const colorScale = d3.scaleOrdinal()
//    .range(d3.schemeCategory10);

//   var svg = d3.select("#scatterplot")
//    .append('svg')
//    .attr('width', width)
//    .attr('height', height)
//    .append('g')
//    .attr("transform", "translate(100,110)");

//   var div = d3.select("#scatterplot")
//    .append("div")
//    .attr("class", "tooltip")
//    .style("opacity", 0);

//   // var xScale = d3.scaleLinear()
//   //  .domain([
//   //   d3.min([0, d3.min(sculpturesHeightGenderDate, function (d) { return d.endDate })]),
//   //   // 0,
//   //   d3.max([0, d3.max(sculpturesHeightGenderDate, function (d) { return d.endDate })])
//   //  ])
//   //  .range([0, plotWidth])

//    var xScale = d3.scalePow()
//   .exponent(0.5)
//   .domain([
//     d3.min([0, d3.min(sculpturesHeightGenderDate, function (d) { return d.endDate })]),
//     // 0,
//     d3.max([0, d3.max(sculpturesHeightGenderDate, function (d) { return d.endDate })])
//    ])
//    .range([0, plotWidth]);

//   var yScale = d3.scaleLinear()
//    .domain([
//     d3.min([0, d3.min(sculpturesHeightGenderDate, function (d) { return d.height })]),
//     d3.max([0, d3.max(sculpturesHeightGenderDate, function (d) { return d.height })])
//    ])
//    .range([plotHeight, 0])

//   var circles = svg.selectAll('circle')
//    .data(sculpturesHeightGenderDate)
//    .enter()
//    .append('circle')
//    .attr('cx', function (d) { return xScale(d.endDate) })
//    .attr('cy', function (d) { return yScale(d.height) })
//    .attr('gender', function (d) { return d.gender })
//    .attr('object-title', function (d) { return d.Title; })
//    .attr('fill', function (d) {
//     var color = '';
//     if (d.gender == 'm') {
//      color = 'Tan';
//     }
//     else if (d.gender == 'b') {
//      color = 'Black';
//     }
//     else {
//      color = 'OrangeRed';
//     }
//     return color;
//    })
//    .attr('fill-opacity', 0.6)
//    .attr('r', '3')
//    .on('mouseover', function (d, i) {
//     console.log("mouseover on", this);
//     d3.select(this)
//      .transition()
//      .duration(100)
//      .attr('r', 10)
//      .attr('stroke', 'black');

//     div.html(`<b>Title:</b> ${d.Title}<br/><br/><b>Medium:</b> ${d.Medium}<br/><br/><b>Height:</b> ${d.height} cm<br/><br/><b>Date:</b> ${d.endDate}<br/><br/><b>Culture:</b> ${d.Culture}<br/><br/><b>Department:</b> ${d.Department}`)
//      .style("opacity", 1)
//      .style("left", (d3.event.pageX) + "px")
//      .style("top", (d3.event.pageY - 28) + "px");
//    })
//    .on('mouseout', function (d, i) {
//     console.log("mouseout", this);
//     d3.select(this)
//      .transition()
//      .duration(100)
//      .attr('r', 2.5)
//      .attr('stroke', 'none');
//     div.html('')
//      .style("opacity", 0)
//      .style("left", "0px")
//      .style("top", "0px");
//    });

//   var xAxis = d3.axisBottom().scale(xScale).tickFormat(d3.format("0"));

//   var yAxis = d3.axisLeft().scale(yScale).tickFormat(d3.format("0"));

//   //x axis
//   svg.append("g")
//    .attr("class", "axis")
//    .attr("transform", "translate(0, 465)")
//    .call(xAxis);

//   //y axis
//   svg.append("g")
//    .attr("class", "axis")
//    // .style("font", "8px times")
//    .attr("transform", "translate(-5, 0)")
//    .call(yAxis);

//   // x axis label
//   svg.append("text")
//    .attr("transform", "translate(" + plotWidth / 2 + ", 510)")
//    .style("text-anchor", "middle")
//    .attr("class", "labels")
//    .text("Year (BC < 0 < AD)")
//    .attr("fill", "DimGray");

//   // y axis label
//   svg.append("text")
//    .style("text-anchor", "middle")
//    .attr("class", "labels")
//    .text("Height (cm)")
//    .attr("transform", "translate(-60, " + plotHeight / 2 + ") rotate(-90)")
//    .attr("fill", "DimGray");

//   // chart title
//   svg.append("text")
//    .attr("transform", "translate(" + plotWidth / 2 + ", 0)")
//    .style("text-anchor", "middle")
//    .attr("class", "charttitle")
//    .text("Met Sculptures: Height vs. Year of Completion")
//    .attr("fill", "DimGray");

//  });



























// //old qualitative viz code



// // let fs = require('fs');

// // // parse merged file (original json with heights, now has added file names)
// // var allSculptures = [];
// // // var sculptures = fs.readFileSync('clippedFileAndHeight.json');
// // // allSculptures = JSON.parse(sculptures);
// // // // console.log(allSculptures.length);


// // fs.readFile('clippedFileAndHeight.json', (error, data) => {
// //   if (error) throw error;


// //   var sculptures = data;
// //   allSculptures = JSON.parse(sculptures);



// // // narrow down this to only sculptures that were clipped - figure out why this # is 1736, but there are only 1607 clipped images?
// // var clippedSculptures = []
// // allSculptures.forEach(sculpture => {
// //     if (sculpture.boundingRectHeightRatio) {
// //         clippedSculptures.push(sculpture)
// //     }
// // });

// // console.log(clippedSculptures.length);

// // // create variables to hold sculptures of different sizes
// // var extraSmallSculptures = [];
// // var smallSculptures = [];
// // var mediumSculptures = [];
// // var largeSculptures = [];
// // var extraLargeSculptures = [];

// // // loop through sculpture objects and categorize (add group to clipped sculptures objects, and also push to array for each category)
// // clippedSculptures.forEach(sculpture => {
// //  if (sculpture.height <= 10) {
// //   sculpture.group = "extraSmall";
// //   extraSmallSculptures.push(sculpture);
// //  } else if (sculpture.height > 10 && sculpture.height <= 50) {
// //   sculpture.group = "small"
// //   smallSculptures.push(sculpture);
// //  } else if (sculpture.height > 50 && sculpture.height <= 100) {
// //   sculpture.group = "medium";
// //   mediumSculptures.push(sculpture);
// //  } else if (sculpture.height > 100 && sculpture.height <=200) {
// //   sculpture.group = "large";
// //   largeSculptures.push(sculpture);
// //  } else {
// //   sculpture.group = "extraLarge";
// //   extraLargeSculptures.push(sculpture);
// //  }
// // });

// // console.log("*****");
// // console.log(extraSmallSculptures.length);
// // console.log("*****");
// // console.log(smallSculptures.length);
// // console.log("*****");
// // console.log(mediumSculptures.length);
// // console.log("*****");
// // console.log(largeSculptures.length);
// // console.log("*****");
// // console.log(extraLargeSculptures.length);

// /* Console.log results ---->
// 1736
// *****
// 293
// *****
// 950
// *****
// 345
// *****
// 125
// *****
// 23
// ------> */


// // // var myImage = document.getElementById("mainImage");
// // var myImageSmall = document.querySelector("#mainSmallImage");
// // console.log(myImageSmall);

// // var myImageMedium = document.querySelector("#mainMediumImage");
// // console.log(myImageMedium);

// // var myImageLarge = document.querySelector("#mainLargeImage");
// // console.log(myImageLarge);


// // var imageIndex = 1;

// // function changeImageSmall(){
// //  myImageSmall.setAttribute("src", "resized_clipped_transparent_png/" + smallSculptures[imageIndex].fileName);
// //  imageIndex++;

// //  myImageSmall.style.height = 30 * smallSculptures[imageIndex].height;

// //  if (imageIndex > smallSculptures.length - 1) {
// //    imageIndex = 0;
// //  }
// // }

// // function changeImageMedium(){
// //  myImageMedium.setAttribute("src", "resized_clipped_transparent_png/" + mediumSculptures[imageIndex].fileName);
// //  imageIndex++;

// //  myImageMedium.style.height = 30 * mediumSculptures[imageIndex].height;

// //  if (imageIndex > mediumSculptures.length - 1) {
// //    imageIndex = 0;
// //  }
// // }

// // function changeImagelarge(){
// //  myImageLarge.setAttribute("src", "resized_clipped_transparent_png/" + largeSculptures[imageIndex].fileName);
// //  imageIndex++;

// //  myImageLarge.style.height = 30 * largeSculptures[imageIndex].height;

// //  if (imageIndex > largeSculptures.length - 1) {
// //    imageIndex = 0;
// //  }
// // }





// // });













// // sculptureObjects.forEach (sculpture => {
// //  var fileName = sculpture.fileName
// //  // console.log(fileName)
// //  imageArray.push('testImages/'+fileName)
// // });


// // var imageObjects = [];

// // var imageObjects = [ {fn:"testImages/17.90.2.jpg", height:20, width:20},
// //   {fn:"testImages/28_159_13.JPG", height: 8, width:10},
// //   {fn:"testImages/64.92a.jpg", height:11, width:15},
// //   {fn:"testImages/84.9.jpg", height:25, width:25},
// //   {fn:"testImages/1891.jpg", height:35, width: 35},
// //   {fn:"testImages/2001.641.jpg", height: 33, width:33}];


// // imageObjects.forEach(image => {

// // var small = document.querySelector(".small img");
// // small.style.height = imageObjects.height;
// // small.style.width = imageObjects.width;

// // var medium = document.querySelector(".medium img");
// // medium.style.height = imageObjects.height;
// // medium.style.height = imageObjects.width;

// // var large = document.querySelector(".large img");
// // large.style.height = imageObjects.height;
// // large.style.width = imageObjects.width;

// // });
