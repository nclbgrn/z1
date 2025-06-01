const maze = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,1,0,0,0,0,1],
    [1,0,1,0,1,0,1,1,0,1],
    [1,0,1,0,0,0,0,1,0,1],
    [1,0,1,1,1,1,0,1,0,1],
    [1,0,0,0,0,1,0,1,0,1],
    [1,1,1,1,0,1,0,1,0,1],
    [1,0,0,1,0,0,0,0,0,1],
    [1,0,0,0,0,1,1,1,2,1], // 2 = cake
    [1,1,1,1,1,1,1,1,1,1],
  ];
  
  const mazeContainer = document.getElementById("maze-container");
  let playerX = 1;
  let playerY = 1;
  
  function drawMaze() {
    mazeContainer.innerHTML = '';
    for (let y = 0; y < maze.length; y++) {
      for (let x = 0; x < maze[y].length; x++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        if (maze[y][x] === 1) cell.classList.add('wall');
        if (x === playerX && y === playerY) cell.classList.add('player');
        if (maze[y][x] === 2) cell.classList.add('cake');
        mazeContainer.appendChild(cell);
      }
    }
  }
  
  function move(dx, dy) {
    const newX = playerX + dx;
    const newY = playerY + dy;
    if (maze[newY][newX] !== 1) {
      playerX = newX;
      playerY = newY;
      drawMaze();
      if (maze[newY][newX] === 2) {
        setTimeout(() => {
          alert("🎂 Congratulations! You found the cake!");
          window.location.href = "cake.html";
        }, 500);
      }
    }
  }
  
  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp": case "w": move(0, -1); break;
      case "ArrowDown": case "s": move(0, 1); break;
      case "ArrowLeft": case "a": move(-1, 0); break;
      case "ArrowRight": case "d": move(1, 0); break;
    }
  });
  
  drawMaze();
  