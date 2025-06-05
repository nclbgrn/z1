const envelope = document.getElementById("envelope");
const envelopeSection = document.getElementById("envelopeSection");
const openLetterBtn = document.getElementById("openLetterBtn");
const bookContainer = document.getElementById("bookContainer");


const buttonContainer = document.getElementById("buttonContainer");
const messages = ["Don't click me", "oKaAAaaYYy", "Clickkk meee", "WhHhAAatTTtT?", "Click me again", "G", "Too slow!", "Bruhhhhh"];
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
    btn.textContent = (i === realButtonIndex) ? "Reaaalllllyyyyyyyyyyy" : messages[Math.floor(Math.random() * messages.length)];
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
        btn.textContent = "NOPE ";
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
        document.body.innerHTML = `
          <div class="transition-screen">
            <h1 class="transition-text">✨ Congrats! You did it! ✨</h1>
            <p class="transition-subtext">You think that's all...? </p>
          </div>
        `;
      
        setTimeout(() => {
          window.location.href = "final.html"; // Replace with your actual file
        }, 4500); // 4.5 seconds for a dreamy pause
      });
      
      
    }

    buttonContainer.appendChild(btn);
  }
}








createButtons();

