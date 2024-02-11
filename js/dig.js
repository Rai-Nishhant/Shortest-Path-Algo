let Dijkstra = (function () {
    class gridNode {
      constructor(x, y, obstacle = false) {
        (this.x = x), (this.y = y);
        (this.distance = Infinity);
        this.obstacle = obstacle;
        this.visited = false;
        this.parent = null;
      }
    }
  
    let nodes = [];
    let startNode = null;
    let goalNode = null;
  
    let open = [];
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
          let node = new gridNode(col, row, nodeState === 3);
          if (nodeState === 1) startNode = node;
          else if (nodeState === 2) goalNode = node;
          nodes[row][col] = node;
        }
      }
    };
  
    const findPath = grid => {
      initGrid(grid);
      return runDijkstra();
    };
  
    const runDijkstra = () => {
      startNode.distance = 0;
      open = [startNode];
  
      while (open.length > 0) {
        let current = getNodeWithLowestDistance();
        open.splice(open.indexOf(current), 1);
        current.visited = true;
        if (current === goalNode) return getPath(current);
        let neighbors = getNeighbors(current);
  
        neighbors.forEach(neighbor => {
          if (neighbor.visited || neighbor.obstacle) return;
          let tentativeDistance = current.distance + 1;
          if (tentativeDistance < neighbor.distance) {
            neighbor.distance = tentativeDistance;
            neighbor.parent = current;
            if (!open.includes(neighbor)) {
              open.push(neighbor);
            }
          }
        });
      }
  
      // no-path found
      return false;
    };
  
    const getNodeWithLowestDistance = () => {
      let closestNode = open[0];
      for (let i = 1; i < open.length; i++) {
        if (open[i].distance < closestNode.distance) {
          closestNode = open[i];
        }
      }
      return closestNode;
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
  