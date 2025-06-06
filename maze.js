const MAZE_ROWS = 14;
const MAZE_COLS = 30;
const CELL_SIZE = 40; // Needs to match CSS .cell width/height

// --- Fixed Maze Array (14 rows x 30 columns) ---
// 1 = Wall, 0 = Path, 2 = Cake
// This is a simple maze where outer boundary is walls and inner is path.
// The cake (2) is placed at the last possible inner path cell.
const maze = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // Row 0 (Wall)
  [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], // Row 1 (Path) - Start at [1,1]
  [1,0,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1], // Row 2
  [1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1], // Row 3
  [1,0,1,0,1,0,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,0,1], // Row 4
  [1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,0,1], // Row 5
  [1,0,0,0,0,0,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,0,1,0,0,0,0,1], // Row 6
  [1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,1,1,1,0,1], // Row 7
  [1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,1,1,1,0,0,1,0,1,0,0,0,0,1,0,1], // Row 8
  [1,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,1,0,1,1,0,1,1,1,0,0,0,0,1], // Row 9
  [1,0,1,0,1,0,1,0,1,1,1,0,1,1,1,1,0,1,0,0,0,0,0,0,0,1,0,0,0,1], // Row 10
  [1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,1,0,1,1,1,1,1,1,1,0,1,0,0,0,1], // Row 11
  [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,1], // Row 12 (Cake at Col 28)
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]  // Row 13 (Wall)
];

// Player starts at (1,1)
let playerX = 1;
let playerY = 1;

// Cake is at the very bottom-right accessible cell
// For a 14x30 grid with outer walls, the last path cell is (12, 28)
const CAKE_ROW = 12;
const CAKE_COL = 28;

const mazeContainer = document.getElementById("maze-container");
const winMessage = document.getElementById("win-message");

function drawMaze() {
    mazeContainer.innerHTML = '';
    mazeContainer.style.gridTemplateColumns = `repeat(${MAZE_COLS}, ${CELL_SIZE}px)`;
    mazeContainer.style.gridTemplateRows = `repeat(${MAZE_ROWS}, ${CELL_SIZE}px)`;

    for (let y = 0; y < MAZE_ROWS; y++) {
        for (let x = 0; x < MAZE_COLS; x++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (maze[y][x] === 1) {
                cell.classList.add('wall');
            } else if (maze[y][x] === 2) {
                // The cake is explicitly marked as '2' in the maze array
                // Add the cake class for styling (even if invisible)
                cell.classList.add('cake');
            }

            // Player cell
            if (x === playerX && y === playerY) {
                cell.classList.add('player');
            }
            mazeContainer.appendChild(cell);
        }
    }
}

function move(dx, dy) {
    const newX = playerX + dx;
    const newY = playerY + dy;

    // Check boundaries and if the new cell is a wall (1)
    // The fixed maze has `1` for walls and `0` for paths, `2` for cake.
    if (newY >= 0 && newY < MAZE_ROWS && newX >= 0 && newX < MAZE_COLS && maze[newY][newX] !== 1) {
        // Remove 'player' and 'moving' classes from current cell
        const currentPlayerCell = mazeContainer.children[playerY * MAZE_COLS + playerX];
        if (currentPlayerCell) {
            currentPlayerCell.classList.remove('player', 'moving');
        }

        playerX = newX;
        playerY = newY;

        // Add 'player' and 'moving' classes to the new cell
        const newPlayerCell = mazeContainer.children[playerY * MAZE_COLS + playerX];
        if (newPlayerCell) {
            newPlayerCell.classList.add('player');
            newPlayerCell.classList.add('moving'); // Add moving class for animation
            setTimeout(() => {
                newPlayerCell.classList.remove('moving'); // Remove after animation duration
            }, 200); // Matches the CSS animation duration for 'moving'
        }

        // Check if the character reached the cake
        if (playerY === CAKE_ROW && playerX === CAKE_COL) {
            winMessage.classList.remove("hidden");
            // Optional: Remove keyboard listener after winning to prevent further movement
            document.removeEventListener("keydown", handleKeyPress);
            setTimeout(() => {
                window.location.href = "cake.html"; // Redirect to cake.html
            }, 2500); // 2.5 second pause before redirect
        }
    }
}

function handleKeyPress(e) {
    switch (e.key) {
        case "ArrowUp": case "w": move(0, -1); break;
        case "ArrowDown": case "s": move(0, 1); break;
        case "ArrowLeft": case "a": move(-1, 0); break;
        case "ArrowRight": case "d": move(1, 0); break;
    }
}

// Initialize the game
function initializeGame() {
    // With a fixed maze array, we just draw it directly.
    drawMaze();
    document.addEventListener("keydown", handleKeyPress);
}

// Call initializeGame when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initializeGame);