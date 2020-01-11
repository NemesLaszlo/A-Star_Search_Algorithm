class Spot {
  constructor(i, j) {
    // Location
    this.i = i;
    this.j = j;
    // f, g, and h values for A*
    this.f = 0;
    this.g = 0;
    this.h = 0;
    // Neighbors
    this.neighbors = [];
    // Where did I come from?
    this.previous = undefined;
    // wall?
    this.wall = false;
    if (random(1) < 0.4) {
      this.wall = true;
    }
  }
  show(col) {
    fill(col);
    if (this.wall) {
      fill(0);
    }
    noStroke();
    rect(this.i * w, this.j * h, w - 1, h - 1);
  }

  addNeighbors(grid) {
    let i = this.i;
    let j = this.j;
    if (i < cols - 1) {
      this.neighbors.push(grid[i + 1][j]);
    }
    if (i > 0) {
      this.neighbors.push(grid[i - 1][j]);
    }
    if (j < rows - 1) {
      this.neighbors.push(grid[i][j + 1]);
    }
    if (j > 0) {
      this.neighbors.push(grid[i][j - 1]);
    }
    if (i > 0 && j > 0) {
      this.neighbors.push(grid[i - 1][j - 1]);
    }
    if (i < cols - 1 && j > 0) {
      this.neighbors.push(grid[i + 1][j - 1]);
    }
    if (i > 0 && j < rows - 1) {
      this.neighbors.push(grid[i - 1][j + 1]);
    }
    if (i < cols - 1 && j < rows - 1) {
      this.neighbors.push(grid[i + 1][j + 1]);
    }
  }
}
