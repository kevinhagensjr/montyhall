const fs = require('fs');

class MontyHall{

  constructor(){
    this.trialCount = 10000; //number of times to attempt game
    this.swtitchWinCount = 0; //number of times switching choices won
    this.stayWinCount = 0; //number of times staying choice won
    this.resultPath = './results.out'; //ouput path of test
  }

  start(){

    for(let i=0; i < this.trialCount; i++){

      let doors = [0,0,0]; //number of doors for selection 0 = donkey, 1 = car
      doors[Math.floor(Math.random() * doors.length)] = 1; //put winning car in position

      let selection = Math.floor(Math.random() * doors.length); //select a random door
      let shownDoor; //door that is shown

      do{
        shownDoor = Math.floor(Math.random() * doors.length); //show random door
      }while(shownDoor == selection || doors[shownDoor]); //dont show the winning car or the selection

      //add results of selection, should be zero if not a car
      this.swtitchWinCount += doors[doors.length - selection - shownDoor]; //add to switch win count
      this.stayWinCount += doors[selection]; //add to stay win count
    }

  this.print();
  }

  print(){

    //create ouput message
    const totals = 'Switching Win Total:' + this.swtitchWinCount + ' Stay Win Total:' + this.stayWinCount;
    const odds = 'Switching Odds:' + (this.swtitchWinCount / this.trialCount).toPrecision(2) * 100 + '% Staying Odds:' + (this.stayWinCount/this.trialCount).toPrecision(2) * 100 + '%';
    const results = totals + '\n' + odds; //log results
    console.log(results);

    fs.writeFile(this.resultPath, results, function(err){ //save results to file
      if(err){
        console.log('Failed to save results to ouput file');
      }
    });
  }
}

const montyHall = new MontyHall;
montyHall.start();
