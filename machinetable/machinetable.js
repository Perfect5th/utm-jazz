export default class MachineTable {
    // Machine table class 

    //EFFECTS: creates an array that has state # of columns, symbol # of rows.  this.machineTable[state][symbol];

    constructor(states, symbols = 17) {
        this.states = states;
        this.symbols = symbols; 
        this.machineTable = []; 
        for (let i = 0; i < states; i++) {
            this.machineTable.push(new Array(symbols)); 
        }       
    }

    getInstruction(state, symbol) {
        let instruction = this.machineTable[state][symbol];
        if (instruction) {
            return instruction; 
        }
        this.machineTable[state][symbol] = this.generate(); 
        instruction = this.machineTable[state][symbol];
        return instruction; 
    }
    
    //EFFECTS: generates new instructions for machine table in form 
    generate() {

        return {
            write: this.getRandomInt(this.symbols - 1), 
            move: this.getRandomInt(3),
            state: this.getRandomInt(this.states - 1) 
        };

    }

    getRandomInt(max) {
        const min = Math.ceil(0);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; 
      }
}