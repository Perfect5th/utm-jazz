    
import Jazz, {NoteTranslator} from "./jazz";
import UTM from "./utm";

const TOTAL_BARS = 8;
const MAXSTATES = 17;
const MINSTATES = 1;
const jazz = new Jazz();

document.addEventListener('DOMContentLoaded', () => {

  const gobutton = document.querySelector("#begin-button");
  gobutton.addEventListener('click', () => {
    //reset img and any sound
    resetAll();

    //have utm play 
    const userOptions = getUserOptions();
    const tape = makeTape(); //empty tape 4x8 
    const utm = new UTM(tape, 20, userOptions.states);
    jazz.oscillatorTypes = userOptions.instruments; 
    const staff = [];

    
    for (let i = 0; i < TOTAL_BARS; i++) {
      utm.begin();      

      const tape = utm.getTape();
      for (let j = 0; j < tape.length; j++) {
        if (staff[j]) {
          staff[j] = staff[j].concat(tape[j].slice());
        } else {
          staff[j] = tape[j].slice();
        }
      }
    }

    const noteTranslator = new NoteTranslator(staff);
    noteTranslator.translate();
    const freqs = noteTranslator.getFreq();
    makeImage(staff);
    showInstruments(userOptions);
    jazz.play(freqs);
    moveBar();
    
    const stopbutton = document.querySelector("#stop-button");
    stopbutton.addEventListener('click', () => {
      stop(jazz);
    });

    const replaybutton = document.querySelector("#replay-button");
    replaybutton.addEventListener('click', () => {
      jazz.stop();
      removeImage();
      makeImage(staff);
      showInstruments(userOptions);
      jazz.play(freqs);
      moveBar();
    });

    const reset = document.querySelector("#reset-button");
    reset.addEventListener('click', () => {
      jazz.stop();
      removeImage();
    });

  });

  const randomizebutton = document.querySelector("#random-button");
  randomizebutton.addEventListener('click', () => {
  //reset img and any sound
  resetAll();
  
  //have utm play with randomized instruments and states
  const randomizerOptions = getRandomizerOptions();
  const tape = makeTape(); //empty tape 4x8 
  const utm = new UTM(tape, 20, randomizerOptions.states);
  jazz.oscillatorTypes = randomizerOptions.instruments; 
  const staff = [];


  for (let i = 0; i < TOTAL_BARS; i++) {
    utm.begin();
    

    const tape = utm.getTape();
    for (let j = 0; j < tape.length; j++) {
      if (staff[j]) {
        staff[j] = staff[j].concat(tape[j].slice());
      } else {
        staff[j] = tape[j].slice();
      }
    }
  }

  const noteTranslator = new NoteTranslator(staff);
  noteTranslator.translate();
  const freqs = noteTranslator.getFreq();

  makeImage(staff);
  showInstruments(randomizerOptions);
  jazz.play(freqs);
  moveBar();

  const stopbutton = document.querySelector("#stop-button");
  stopbutton.addEventListener('click', () => {
    stop(jazz);
  });

  const replaybutton = document.querySelector("#replay-button");
  replaybutton.addEventListener('click', () => {
    jazz.stop();
    removeImage();
    makeImage(staff);
    showInstruments(randomizerOptions);
    jazz.play(freqs);
    moveBar();
  });

  const reset = document.querySelector("#reset-button");
    reset.addEventListener('click', () => {
      jazz.stop();
      removeImage();
    });
  });

});


function getUserOptions() {
  const userOptions = {
    instruments: [], 
    states: 4,
  };
  userOptions.states = parseInt(document.querySelector("#stateval").value);
  console.log(userOptions)

  for (let i = 0; i < 4; i++) {
    userOptions.instruments.push(document.querySelector(`#instrument-${i}`).value);
  }

  return userOptions;
}

function getRandomizerOptions() {
  const randomizerOptions = {
    instruments: [], 
    states: 4,
  };
  randomizerOptions.states = Math.floor(Math.random() * MAXSTATES) + MINSTATES;
  console.log(randomizerOptions)

  var instrumentsoptions = ["chiptune","brass","bass","organ"];
  for (let i = 0; i < 4; i++) {
    var index = Math.floor(Math.random() * instrumentsoptions.length);
    randomizerOptions.instruments.push(instrumentsoptions[index]);
  }

  return randomizerOptions;
}

function makeTape() {
  const tape = [];

  for (let i = 0; i < 4; i++) {
    tape[i] = [];
  
    for (let j = 0; j < 8; j++) {
      tape[i][j] = 0;
    }
  } 
  return tape;
}

function makeImage(staff) {
  var musicsheet = document.getElementById("music-sheets")

  //for each row in the staff (each instrument) create an image of a staff
  for (let y = 0; y < staff.length; y++){
   var notesheet = document.createElement("div");
   notesheet.id ="music-animation";
   musicsheet.appendChild(notesheet);
   var divider = document.createElement("div");
   divider.id ="sheet-divider";
   musicsheet.appendChild(divider);
   
   var notexvalue = 10; 
   var noteyvalue = 10; 
   //for each note for each instrument staff, create a new note and place on img
    for (let x = 0; x < staff[y].length; x++) {
      var newnote = document.createElement("div");
      newnote.id = "music-notes";
      notesheet.appendChild(newnote);

      if (staff[y][x] == 0) {
        newnote.style.bottom = noteyvalue;
        newnote.style.left = notexvalue;
        notexvalue += 10;
      } else {
        var notevalue = staff[y][x] % 8;
        newnote.style.bottom = (noteyvalue + 10*notevalue) + "px";
        notexvalue += 10;
        newnote.style.left = notexvalue + "px";

    }
  }
}
}

function removeImage(){
  resetAll();

  for (let j = 0; j < 4; j++){
    var instname = document.getElementById(`inst-${j}`);
    instname.innerHTML = "";
  }
  }

function moveBar(){
  var bar = document.getElementById("music-bar");
  var pos = 0;
  var loc = setInterval(move,23);

  function move(){
    var imgwidth = document.getElementById("music-animation").clientWidth
    if (pos == imgwidth) {
      clearInterval(loc);
    } else {
        pos++;
        bar.style.left = pos + "px";
    }
  }
}

function resetAll(){
  var musicsheet = document.getElementById("music-sheets");
    while(musicsheet.firstChild){
      musicsheet.removeChild(musicsheet.firstChild);
    }
    var newbar = document.createElement("div");
    newbar.id = "music-bar";
    musicsheet.appendChild(newbar); 
    jazz.stop(); 
}

function stop(jazz){
  jazz.stop();
  var musicbar = document.getElementById("music-bar");
  const pos = window.getComputedStyle(musicbar).getPropertyValue("margin-left");
  var newbar = musicbar.cloneNode(true);
  musicbar.parentNode.replaceChild(newbar,musicbar);
  newbar.style.left = pos + "px";
}

function showInstruments(userOptions){
  const instr = userOptions.instruments;
  for (let i = 0; i < instr.length; i++){

    var element = document.getElementById(`inst-${i}`);
    element.innerHTML = instr[i];

    var choseninstr = document.getElementById(`instrument-${i}`);
    choseninstr.value = instr[i];
  }


}
