// Function to delete element from the array
function removeFromArray(arr, elt) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elt) {
      arr.splice(i, 1);
    }
  }
}

function heuristic(a, b) {
  let d = dist(a.i, a.j, b.i, b.j);
  return d;
}

// How many columns and rows
let cols = 50;
let rows = 50;

//  2D array
let grid = new Array(cols);

// Open and closed set
let openSet = [];
let closedSet = [];

// Start and end
let start;
let end;

// Width and height of each cell of grid
let w, h;

// The road taken
let path = [];

function setup() {
  createCanvas(400, 400);
  console.log('A*');

  // Grid cell size
  w = width / cols;
  h = height / rows;

  // 2D array
  for (let i = 0; i < cols; ++i) {
    grid[i] = new Array(rows);
  }

  for (let i = 0; i < cols; ++i) {
    for (let j = 0; j < rows; ++j) {
      grid[i][j] = new Spot(i, j);
    }
  }

  // All neighbors
  for (let i = 0; i < cols; ++i) {
    for (let j = 0; j < rows; ++j) {
      grid[i][j].addNeighbors(grid);
    }
  }

  // Start and end
  start = grid[0][0];
  end = grid[cols - 1][rows - 1];
  start.wall = false;
  end.wall = false;

  openSet.push(start);
}

function draw() {
  // still searching?
  let current;
  if (openSet.length > 0) {
    // Best next option
    let winner = 0;
    for (let i = 0; i < openSet.length; ++i) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }
    current = openSet[winner];

    // finish?
    if (current === end) {
      noLoop();
      console.log('DONE!');
    }

    removeFromArray(openSet, current);
    closedSet.push(current);

    // Check all the neighbors
    let neighbors = current.neighbors;
    for (let i = 0; i < neighbors.length; ++i) {
      let neighbor = neighbors[i];

      // Valid next spot?
      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        let tempG = current.g + heuristic(neighbor, current);

        // Is this a better path than before?
        let newPath = false;
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }
        } else {
          neighbor.g = tempG;
          newPath = true;
          openSet.push(neighbor);
        }

        // Yes, it's a better path
        if (newPath) {
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
      }
    }
    // no solution
  } else {
    console.log('no solution');
    noLoop();
    return;
  }

  // Draw current state of everything
  background(255);

  for (let i = 0; i < cols; ++i) {
    for (let j = 0; j < rows; ++j) {
      grid[i][j].show(color(0, 0, 0, 50));
    }
  }

  for (let i = 0; i < closedSet.length; ++i) {
    closedSet[i].show(color(255, 0, 0, 50));
  }

  for (let i = 0; i < openSet.length; ++i) {
    openSet[i].show(color(0, 255, 0, 50));
  }

  // Find the path by working backwards
  path = [];
  let temp = current;
  path.push(temp);
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }

  // Drawing path as continuous line
  noFill();
  stroke(0, 0, 200);
  strokeWeight(w / 2);
  beginShape();
  for (let i = 0; i < path.length; ++i) {
    vertex(path[i].i * w + w / 2, path[i].j * h + h / 2);
  }
  endShape();
}
