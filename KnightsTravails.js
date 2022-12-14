class Play {
  coordinate = [];
  nextPlays = null;

  constructor(coordinate) {
    this.coordinate = coordinate;
  }
}

class Knight {
  knightFrom = [];
  knightTo = [];

  knightMoves(from, to) {
    if (from == to) {
      return "Error- You are already there!";
    }
    this.knightFrom = new Play(from);
    this.knightTo = new Play(to);
    this.createPath(this.knightFrom, this.knightTo);
    const answer = this.pathToString(this.findPath(this.knightFrom, this.knightTo));
    console.log("Knight path to reach "+to+" from "+from+": ");
    console.log(answer);
  }

  createNextPlays(play) {
    const line = play.coordinate[0];
    const column = play.coordinate[1];
    const allPlays = [
      [line + 2, column + 1],
      [line + 2, column - 1],
      [line - 2, column + 1],
      [line - 2, column - 1],
      [line + 1, column + 2],
      [line - 1, column + 2],
      [line + 1, column - 2],
      [line - 1, column - 2],
    ];
    const possiblePlays = allPlays.filter((value) => {
      if (value[0] >= 0 && value[0] < 8) {
        if (value[1] >= 0 && value[1] < 8) {
          return true;
        }
      }
      return false;
    });
    const nextPlays = possiblePlays.map((value) => {
      return new Play(value);
    });
    return nextPlays;
  }

  searchMove(movesTree, to) {
    if (movesTree != null) {
      for (let index = 0; index < movesTree.length; index++) {
        const element = movesTree[index];
        if (this.testMove(element, to)) {
          return true;
        }
      }
    }
    return false;
  }

  testMove(a, b) {
    if (
      a.coordinate[0] == b.coordinate[0] &&
      a.coordinate[1] == b.coordinate[1]
    ) {
      return true;
    } else {
      return false;
    }
  }

  createPath(play, to) {
    play.nextPlays = this.createNextPlays(play);
    if (this.searchMove(play.nextPlays, to)) {
      return "found";
    }
    const queue = [play.nextPlays];
    let pointer;
    while (true) {
      pointer = queue.shift();
      for (let index = 0; index < pointer.length; index++) {
        const element = pointer[index];
        element.nextPlays = this.createNextPlays(element);
        if (this.searchMove(element.nextPlays, to)) {
          return element;
        } else {
          queue.push(element.nextPlays);
        }
      }
    }
  }

  findPath(from, to) {
    const path = [];
    if (from.nextPlays == null) {
      return false;
    }
    if (this.searchMove(from.nextPlays, to)) {
      path.push(to);
      path.push(from);
      return path;
    } else {
      for (let index = 0; index < from.nextPlays.length; index++) {
        const futurePlay = from.nextPlays[index];
        const temp = this.findPath(futurePlay, to);
        if (temp) {          
          path.push(...temp);
          break;
        }
      }
    }
    if (path.length == 0) {
      return false;
    } else {
      path.push(from);      
      return [...path];
    }
  }

   pathToString(array){
    const string = [];
    array.reverse()
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      string.push(element.coordinate);
    }
    return string;    
   }
}

const knight = new Knight();
knight.knightMoves([0, 0], [0, 7]);
