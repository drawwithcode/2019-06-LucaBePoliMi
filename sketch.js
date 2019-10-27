//var moveText = ["I've moved the ducks!", "Now the ducks are over there!", "Quick, get them!", "Relocating the ducks!", "Come on, I don't have all day"];
duckiesNumber = 5;

function preload() {
  pentagramImg = loadImage("./assets/pentagramRed.png");
}

// Variable for a div which will serve as background
var mainBackground;

// Variables for divs which will highlight the area where the duckies are going
var back1;
var back2;
var back3;
var back4;

// Variables which will be used to change area color according to a timer
var back1Color = false;
var back2Color = false;
var back3Color = false;
var back4Color = false;

// for some reason I can't use windowWidth and windowHeight to define variables outside preset functions
var tableX;
var tableY;

/*var tableX = windowWidth/2;
var tableY = windowHeight/2;*/

function setup() {

  // Selecting the prebuilt div by its id
  mainBackground = select("#mainBackground");
  // Adding a class which gives dimensions of the screen
  mainBackground.addClass("fakeBody");
  mainBackground.position(0, 0);

  // Setting up the divs which will highlight where the duckies are going
  back1 = createElement("div");
  // This class gives dimensions
  back1.addClass("backDiv");
  back1.position(0, 0);
  back1.id("backDiv1");

  back2 = createElement("div");
  back2.addClass("backDiv");
  back2.position(windowWidth / 2, 0);
  back2.id("backDiv2");

  back3 = createElement("div");
  back3.addClass("backDiv");
  back3.position(windowWidth / 2, windowHeight / 2);
  back3.id("backDiv3");

  back4 = createElement("div");
  back4.addClass("backDiv");
  back4.position(0, windowHeight / 2);
  back4.id("backDiv4");


// Creating a little canvas in the middle of the screen

  var tableW = 350;
  var tableH = 350;

  tableX = windowWidth / 2;
  tableY = windowHeight / 2;

  var necroTable = createCanvas(tableW, tableH);
  necroTable.position(tableX - tableW / 2, tableY - tableH / 2);
  background(50, 100, 83);

  // Creating instructions
  push();
  fill(255, 255, 255);
  textFont("Trebuchet MS");
  textAlign(CENTER);
  textSize(25);
  text("Catch all the duckies with your mouse!", width / 2 - 125, height / 2 - 25, 250, 500);
  pop();



  // Creation of divs framing ducks
  var duckyDivPosX = 30;
  var duckyDivPosY = 30;
  for (d = 0; d < duckiesNumber; d++) {
    var duckyDiv = createElement("div");
// This way the duckies are created with a range of randomness in their X position
// and regularly in their Y position
    duckyDiv.position(random() * d * duckyDivPosX, d * duckyDivPosY);
// Adds duck image in the CSS
    duckyDiv.addClass("duckContainer");
// Function triggered to move the duckies to a certain position when clicked
    duckyDiv.mousePressed(positioning);
    // Adds animation in the CSS
    duckyDiv.addClass("move");
  }

  // Timer for coloring divs starts at -600 because the first div
  // must be colored immediately (millis() always start > of a negative number)
  // & the result must give time = 900 so that until 1500 there's 600 left,
  // which is 10% of the total animation (time in which the ducks stay put,
  // so the colored div must stay colored too)
  time = -600;


}


// Variables used to create a sequence of arcs which will link the duckies, forming a circle
var duckPositioned1 = false;
var duckPositioned2 = false;
var duckPositioned3 = false;
var duckPositioned4 = false;
var duckPositioned5 = false;

// width and height of each arc
var hellArcW = 250;
var hellArcH = 250;

// Variable used to create the final text
var endCall = false;

function draw() {


// Setting up a timer:
  if (millis() > time) {
// When time value is reached by the milliseconds, the following will happen
// and 1500 milliseconds are added to be reached again and so making happen the following again
    time = time + 1500;

// The first colored div is colored if all the color variables are false or if the 4th div color variable is true
// since it can be the absolute first or the first after the last one(back4)
// After the start, all the color divs are colored one at a time and one after another
// this happens each time the time limit(with the timer) is reached:
// every color variable is checked and one color div is colored if the previous one
// has its color variable = true and all the other are false
    if (back1Color == false && back2Color == false && back3Color == false && (back4Color == true || back4Color == false) && duckPositioned5 == false)

    {
      // Removing color from the previous div
      back4.removeClass("backDivColored");
      // And coloring this one
      back1.addClass("backDivColored");
      // Setting the color variables so that this one results true
      // and all the others false, so that the next color div can be allowed to be colored
      back1Color = true;
      back2Color = false;
      back3Color = false;
      back4Color = false;
    } else if (back1Color == true && back2Color == false && back3Color == false && back4Color == false && duckPositioned5 == false)

    {
      back1.removeClass("backDivColored");
      back2.addClass("backDivColored");
      back1Color = false;
      back2Color = true;
      back3Color = false;
      back4Color = false;

    } else if (back1Color == false && back2Color == true && back3Color == false && back4Color == false && duckPositioned5 == false)

    {
      back2.removeClass("backDivColored");
      back3.addClass("backDivColored");
      back1Color = false;
      back2Color = false;
      back3Color = true;
      back4Color = false;
    } else if (back1Color == false && back2Color == false && back3Color == true && back4Color == false && duckPositioned5 == false)

    {
      back3.removeClass("backDivColored");
      back4.addClass("backDivColored");
      back1Color = false;
      back2Color = false;
      back3Color = false;
      back4Color = true;
    }
// When the final duck is placed the color divs stop coloring
  } else if (duckPositioned5 == true) {

    back1.removeClass("backDivColored");
    back2.removeClass("backDivColored");
    back3.removeClass("backDivColored");
    back4.removeClass("backDivColored");

  }

// when the last duck is placed a rectangle covers the canvas
// and the pentagram image is created
// also a "h1" is created, but to avoid creating it each frame
// it is created just when endCall = false, which becomes = true after creating the "h1"
  if (endCall == false) {
    if (duckPositioned5 == true) {

      push();
      rectMode(CENTER)
      noStroke();
      fill("black");
      rect(width / 2, height / 2, 350, 350);
      pop();

      var pentagram = image(pentagramImg, width / 2 - 125, height / 2 - 107, pentagramImg.width, pentagramImg.height)
      var endText = createElement("h1", "Happy Halloween :)")
      // endText is set as child of the mainBackground div, inheriting its text attributes
      endText.parent(mainBackground);
      // the background color is also changed by editing the div's style
      mainBackground.style("background-color", "#330136");
      // this stops h1 creating forever
      endCall = true;
    }
  } else if (endCall == true) {
    /*  if (duckPositioned5 == true) {
// do nothing
    }*/
  }


// Creation of the joint arcs
  angleMode(DEGREES);

  push();

  noFill();
  stroke(102, 0, 0);
  // the last duck joins the last 2 arcs together
  if (duckPositioned5 == true) {
    arc(width / 2, height / 2, hellArcW, hellArcH, 18, 90, OPEN)
    arc(width / 2, height / 2, hellArcW, hellArcH, 90, 162, OPEN)
  }
  if (duckPositioned4 == true) {

    arc(width / 2, height / 2, hellArcW, hellArcH, 162, 234, OPEN);
  }
  // Then each duck creates 1 arc
  if (duckPositioned3 == true) {

    arc(width / 2, height / 2, hellArcW, hellArcH, 234, 306, OPEN);
  }
// The first 2 ducks create 1 arc
  if (duckPositioned2 == true) {

    arc(width / 2, height / 2, hellArcW, hellArcH, 306, 18, OPEN);
  }
  if (duckPositioned1 == true) {

    arc(width / 2, height / 2, 0, 0, 0, 0, OPEN)
  }



  pop();

}

// Half of the dimensions(set in CSS) of the framing div for the duck images
var duckContainerSemiW = 15;
var duckContainerSemiH = 15;

// each duck(when clicked on) is positioned to form a pentagram together
function positioning() {
// these variables become true one after another after each duck is placed, and their combinatin decides the place in which each duck is going
  if (duckPositioned1 == false && duckPositioned2 == false && duckPositioned3 == false && duckPositioned4 == false && duckPositioned5 == false) {
// the duck stops moving
    this.removeClass("move");
// the position is each point of the pentagram, so it's calculated starting from the coordinates of the center of the canvas,
// then the framing divs for ducks are centered by translating them back by half their width and height,
// then they are translated by the arc width and height multiplied for cos and sin of needed angles
    this.position(tableX - duckContainerSemiW + hellArcW / 2 * cos(18), tableY - duckContainerSemiH + hellArcH / 2 * sin(18));
// the first duck has been placed
    duckPositioned1 = true;
  } else if (duckPositioned1 == true && duckPositioned2 == false && duckPositioned3 == false && duckPositioned4 == false && duckPositioned5 == false) {

    this.removeClass("move");

    this.position(tableX - duckContainerSemiW + hellArcW / 2 * cos(306), tableY - duckContainerSemiH + hellArcH / 2 * sin(306));

    duckPositioned2 = true;
  } else if (duckPositioned2 == true && duckPositioned1 == true && duckPositioned3 == false && duckPositioned4 == false && duckPositioned5 == false) {

    this.removeClass("move");

    this.position(tableX - duckContainerSemiW + hellArcW / 2 * cos(234), tableY - duckContainerSemiH + hellArcH / 2 * sin(234));

    duckPositioned3 = true;

  } else if (duckPositioned3 == true && duckPositioned2 == true && duckPositioned1 == true && duckPositioned4 == false && duckPositioned5 == false) {

    this.removeClass("move");

    this.position(tableX - duckContainerSemiW + hellArcW / 2 * cos(162), tableY - duckContainerSemiH + hellArcH / 2 * sin(162));

    duckPositioned4 = true;

  } else if (duckPositioned4 == true && duckPositioned3 == true && duckPositioned2 == true && duckPositioned1 == true) {

    this.removeClass("move");

    this.position(tableX - duckContainerSemiW + hellArcW / 2 * cos(90), tableY - duckContainerSemiH + hellArcH / 2 * sin(90));

    duckPositioned5 = true;

  }

}
