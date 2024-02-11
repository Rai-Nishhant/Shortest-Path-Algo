let DFS = (function () {
  let nodes = [];
  let startNode = null;
  let goalNode = null;

  let stack = [];
  let gridWidth, gridHeight;
  let noOfDirections = 4;
  let directionX = [1, -1, 0, 0];
  let directionY = [0, 0, 1, -1];

  const initGrid = grid => {
    gridHeight = grid.length;
    gridWidth = grid[0].length;

    for (let row = 0; row < gridHeight; row++) {
      nodes[row] = [];
      for (let col = 0; col < gridWidth; col++) {
        let nodeState = grid[row][col];
        let node = { x: col, y: row, obstacle: nodeState === 3, visited: false, parent: null };
        if (nodeState === 1) startNode = node;
        else if (nodeState === 2) goalNode = node;
        nodes[row][col] = node;
      }
    }
  };

  const findPath = grid => {
    initGrid(grid);
    return runDFS();
  };

  const runDFS = () => {
    stack.push(startNode);

    while (stack.length > 0) {
      let current = stack.pop();
      current.visited = true;
      if (current === goalNode) return getPath(current);
      let neighbors = getNeighbors(current);

      neighbors.forEach(neighbor => {
        if (!neighbor.visited && !neighbor.obstacle) {
          neighbor.visited = true;
          neighbor.parent = current;
          stack.push(neighbor);
        }
      });
    }

    // no-path found
    return false;
  };

  const getNeighbors = currentNode => {
    let neighbors = [];
    for (let k = 0; k < noOfDirections; k++) {
      let newX = currentNode.x + directionX[k];
      let newY = currentNode.y + directionY[k];
      if (isValidNode(newX, newY)) {
        neighbors.push(nodes[newY][newX]);
      }
    }
    return neighbors;
  };

  const isValidNode = (x, y) => x >= 0 && x < gridWidth && y >= 0 && y < gridHeight;

  const getPath = node => {
    let path = [];
    while (node.parent !== null) {
      path.unshift({ x: node.x, y: node.y });
      node = node.parent;
    }
    return path;
  };

  return {
    findPath: findPath,
  };
})();
