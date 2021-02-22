const GetNeighbors = (field, x, y) => {
  const neighbors = [];
  //up
  if (x > 0) {
    neighbors.push(field[x - 1][y]);
  }
  //down
  if (x < field.length - 1) {
    neighbors.push(field[x + 1][y]);
  }
  //left
  if (y > 0) {
    neighbors.push(field[x][y - 1]);
  }
  //right
  if (y < field.length - 1) {
    neighbors.push(field[x][y + 1]);
  }
  // top left
  if (x > 0 && y > 0) {
    neighbors.push(field[x - 1][y - 1]);
  }
  // top right
  if (x > 0 && y < field.length - 1) {
    neighbors.push(field[x - 1][y + 1]);
  }
  // bottom right
  if (x < field.length - 1 && y < field.length - 1) {
    neighbors.push(field[x + 1][y + 1]);
  }
  // bottom left
  if (x < field.length - 1 && y > 0) {
    neighbors.push(field[x + 1][y - 1]);
  }

  return neighbors;
};

export default GetNeighbors;
