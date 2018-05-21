var view = {
  displayMessage: function(msg){
    var messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = msg;
  },
  displayHit: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class","hit");
  },
  displayMiss: function(location){
    var cell = document.getElementById(location);
    cell.setAttribute("class","miss");
  }
};
var ship1 = {
  location: ["10", "20", "30"],
  hit: ["", "", ""]
};
var model = {
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipsSunk: 0,


  ships:[{ locations: [0,0, 0], hits: ["", "", ""] },
         { locations: [0, 0, 0], hits: ["", "", ""] },
         { locations: [0, 0, 0], hits: ["", "", ""] }],

  fire: function(guess){
    for (var i = 0; i < this.numShips; i++){
      var ship = this.ships[i];
      var index = ship.locations.indexOf(guess);
      if (index >= 0){
          ship.hits[index] = "hit";
          view.displayHit(guess);
          view.displayMessage("HIT!");
          if (this.isSunk(ship)){
            view.displayMessage("You sank my battleship!");
            this.shipsSunk++;
          }
          return true;
      }
    }
    view.displayMiss(guess);
    view.displayMessage("You missed.");
    return false;
  },
  isSunk: function(ship){
    for(var i = 0; i< this.shipLength; i++){
      if(ship.hits[i] !=="hit"){
          return false;
      }
    }
    return true;
  },
  generateShipLocations: function(){},


};
function parseGuess(guess){
  var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
  if(guess === null || guess.length !== 2){
    alert("Oops, please enter a letter and a number in the board.");
  }else{
    firtstChar = guess.charAt(0);
    var row = alphabet.indexOf(firtstChar);
    var column = guess.charAt(1);

    if (isNaN(row) || isNaN(column)) {
      alert("Oops, that isn't on the board.");
    }else if (row < 0 || row >= model.boardSize ||
               column < 0 || column >= model.boardSize){
      alert("Oops, that's off the board!");
    }else{
      return row + column;
    }
  }
  return null;
}

var controller = {
  guesses: 0,

  processGuess: function(guess){
    var location = parseGuess(guess);
    if (location){
      this.guesses++;
      var hit = model.fire(location);
      if (hit && model.shipsSunk === model.numShips){
            view.displayMessage("You sank all my battleships, in " + this.guesses + "gueses" );
      }
    }
  }
};
function init(){
  var fireButton = document.getElementById("fireButton");
  fireButton.onclick = handleFireButton;
  var guessInput = document.getElementById("guessaInput");
  guessInput.onkeypress = handleKeyPress;
}
function handleKeyPress(e){
  var fireButton = document.getElementById("fireButton");
  if (e.keyCode === 13){
    fireButton.click();
    return false;
  }
}
function handleFireButton(){
  var guessInput = document.getElementById("guessInput");
  var guess = guessInput.value;
  controller.processGuess(guess);

  guessInput.value = "";
}
window.onload = init;

var ships = [{ locations: ["10", "20", "30"], hits: ["", "", ""] },
             { locations: ["32", "33", "34"], hits: ["", "", ""] },
             { locations: ["63", "64", "65"], hits: ["", "", "hit"] }];


view.displayMessage("Tap tap, is this thing on?");