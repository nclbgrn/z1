const envelope = document.getElementById("envelope");
const envelopeSection = document.getElementById("envelopeSection");
const openLetterBtn = document.getElementById("openLetterBtn");
const bookContainer = document.getElementById("bookContainer");


const buttonContainer = document.getElementById("buttonContainer");
const messages = ["Don't click me", "Wrong one", "Try again", "Almost!", "Nope", "Hehe", "Too slow!", "Getting closer"];
const totalButtons = 10;
let realButtonIndex = Math.floor(Math.random() * totalButtons);

function getRandomPosition() {
  return {
    top: Math.random() * 80 + "%",
    left: Math.random() * 90 + "%"
  };
}

function createButtons() {
  for (let i = 0; i < totalButtons; i++) {
    const btn = document.createElement("button");
    btn.classList.add("click-button");
    btn.textContent = (i === realButtonIndex) ? "CLICK ME FOR REAL 🏱" : messages[Math.floor(Math.random() * messages.length)];
    const pos = getRandomPosition();
    btn.style.top = pos.top;
    btn.style.left = pos.left;

    if (i !== realButtonIndex) {
      btn.addEventListener("mouseover", () => {
        const newPos = getRandomPosition();
        btn.style.top = newPos.top;
        btn.style.left = newPos.left;
      });

      btn.addEventListener("click", () => {
        btn.textContent = "NOPE 😝";
        btn.style.backgroundColor = "#dc3545";
      });
    } else {
      // Only move when mouse gets VERY close
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const dist = Math.hypot(
          e.clientX - (rect.left + rect.width / 2),
          e.clientY - (rect.top + rect.height / 2)
        );
        if (dist < 150) {
          const newPos = getRandomPosition();
          btn.style.top = newPos.top;
          btn.style.left = newPos.left;
        }
      });

      btn.addEventListener("click", () => {
        // Success! Hide buttons, show envelope
        buttonContainer.style.display = "none";
        envelopeSection.style.display = "flex";
      });
    }

    buttonContainer.appendChild(btn);
  }
}

envelope.addEventListener("click", () => {
    envelope.classList.toggle("flipped");
    openLetterBtn.style.display = "block"; // Show the "open love letter" button
  });

  openLetterBtn.addEventListener("click", () => {
    envelopeSection.style.display = "none";
    bookContainer.style.display = "block";
  });





createButtons();

let currentPage = 1;
const flipBook = document.getElementById("flipBook");

flipBook.addEventListener("click", () => {
  currentPage++;
  if (currentPage > 4) currentPage = 1;
  const angle = (currentPage - 1) * -180;
  flipBook.style.transform = `rotateY(${angle}deg)`;
});


envelope.addEventListener("click", () => {
    envelope.classList.add("flipped");
    openLetterBtn.style.display = "inline-block";
  });
  
  openLetterBtn.addEventListener("click", () => {
    envelopeSection.style.display = "none";
    bookContainer.style.display = "block";
  });
  
  let lane = 1; // middle lane
  let distance = 0;
  let energy = 100;
  let isJumping = false;
  const runner = document.getElementById("runner");
  const meterCount = document.getElementById("meterCount");
  const energyLevel = document.getElementById("energyLevel");
  const lanes = [document.getElementById("lane0"), document.getElementById("lane1"), document.getElementById("lane2")];
  
  function switchLane(dir) {
    lane += dir;
    if (lane < 0) lane = 0;
    if (lane > 2) lane = 2;
    lanes.forEach(l => l.contains(runner) && l.removeChild(runner));
    lanes[lane].appendChild(runner);
  }
  
  function jump() {
    if (isJumping) return;
    isJumping = true;
    runner.style.bottom = "60px";
    setTimeout(() => {
      runner.style.bottom = "0px";
      isJumping = false;
    }, 600);
  }
  
  function createItem(type) {
    const item = document.createElement("div");
    item.classList.add(type === "obstacle" ? "obstacle" : "boost");
    item.innerText = type === "obstacle" ? "🏋️" : "💊";
    const itemLane = Math.floor(Math.random() * 3);
    lanes[itemLane].appendChild(item);
    item.dataset.lane = itemLane;
  
    item.addEventListener("animationend", () => item.remove());
  
    const interval = setInterval(() => {
      if (parseInt(item.dataset.lane) === lane && !isJumping) {
        if (type === "obstacle") {
          energy -= 10;
        } else if (type === "boost") {
          energy += 10;
          if (energy > 100) energy = 100;
        }
        energyLevel.textContent = energy;
        item.remove();
        clearInterval(interval);
      }
    }, 100);
  }
  
  function startGymChallenge() {
    document.getElementById("gymChallenge").style.display = "block";
    const gameInterval = setInterval(() => {
      distance++;
      energy -= 1;
      meterCount.textContent = distance;
      energyLevel.textContent = energy;
  
      if (Math.random() < 0.3) createItem("obstacle");
      if (Math.random() < 0.2) createItem("boost");
  
      if (distance >= 100 && energy > 0) {
        clearInterval(gameInterval);
        document.getElementById("gymChallenge").style.display = "none";
        document.getElementById("bookContainer").style.display = "block";
      }
  
      if (energy <= 0) {
        clearInterval(gameInterval);
        alert("😢 You ran out of energy! Try again!");
        location.reload(); // restart challenge
      }
    }, 300);
  }
  
  // Controls
  document.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft" || e.key === "a") switchLane(-1);
    if (e.key === "ArrowRight" || e.key === "d") switchLane(1);
    if (e.key === " " || e.key === "ArrowUp") jump();
  });
  
  // Trigger this after envelope is clicked:
  document.getElementById("openLetterBtn").addEventListener("click", () => {
    document.getElementById("envelopeSection").style.display = "none";
    startGymChallenge();
  });
  