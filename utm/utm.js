import {directions} from './directions';

export default class UTM {
  // REQUIRES plain Object machineTable of the shape
  //          {
  //            <state>: 
  //              <read_symbol>: {
  //                write: <symbol>,
  //                move: <direction>,
  //                state: <state>
  //              },
  //              ...
  //            },
  //            ...
  //          }
  //          2D array tape
  //          positive int operationCount
  constructor(machineTable, tape, operationCount) {
    this.x = 0;
    this.y = 0;

    this.machineTable = machineTable;
    this.tape = tape;
    this.operationCount = operationCount;

    this.state = parseInt(Object.keys(machineTable)[0], 10);
  }

  // MODIFIES: this
  // EFFECTS: performs a number of operations equal to operationCount
  begin() {
    for (let i = 0; i < this.operationCount; i++) {
      this.read();
      this.write();
      this.move();
      this.changeState();
    }
  }

  // MODIFIES: this
  // EFFECTS: reads the symbol that is currently under the tape.
  read() {
    this.lastRead = this.tape[this.y][this.x];
  }

  // MODIFIES: this
  // EFFECTS: writes a symbol to the current tape location based on state.
  write() {
    const toWrite = this.machineTable[this.state][this.lastRead].write;

    this.tape[this.y][this.x] = toWrite;
  }

  // MODIFIES: this
  // EFFECTS: moves on the tape in the direction given by current state.
  move() {
    switch (this.machineTable[this.state][this.lastRead].move) {
      case directions.UP:
        return this.moveUp();
      case directions.RIGHT:
        return this.moveRight();
      case directions.DOWN:
        return this.moveDown();
      case directions.LEFT:
        return this.moveLeft();
      default:
    }
  }

  // MODIFIES: this
  // EFFECTS: moves up on the tape, rolling over to the bottom.
  moveUp() {
    if (this.y === 0) {
      this.y = this.tape.length - 1;
    } else {
      this.y--;
    }
  }

  // MODIFIES: this
  // EFFECTS: moves right on the tape, rolling over to the left.
  moveRight() {
    if (this.x === this.tape[0].length - 1) {
      this.x = 0;
    } else {
      this.x++;
    }
  }

  // MODIFIES: this
  // EFFECTS: moves down on the tape, rolling over to the top.
  moveDown() {
    if (this.y === this.tape.length - 1) {
      this.y = 0;
    } else {
      this.y++;
    }
  }

  // MODIFIES: this
  // EFFECTS: moves left on the tape, rolling over to the right.
  moveLeft() {
    if (this.x === 0) {
      this.x = this.tape[0].length - 1;
    } else {
      this.x--;
    }
  }

  // MODIFIES: this
  // EFFECTS: changes to new state as specified by current state.
  changeState() {
    const newState = this.machineTable[this.state][this.lastRead].state;

    this.state = parseInt(newState, 10);
  }

  // Getters
  getState() {
    return this.state;
  }

  getTape() {
    return this.tape;
  }
}
