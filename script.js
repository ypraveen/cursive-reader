// Load words.txt and initialize
let words = [];
let currentIndex = 0;
let quizIndex = 0;

// Helper to shuffle array in-place
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function isTouchDevice() {
  return (('ontouchstart' in window) ||
          (navigator.maxTouchPoints > 0) ||
          (navigator.msMaxTouchPoints > 0));
}

const cursiveWord = document.getElementById("cursive-word");
const printWord = document.getElementById("print-word");
const nextBtn = document.getElementById("next-btn");

const quizCursive = document.getElementById("quiz-cursive");
const quizInput = document.getElementById("quiz-input");
const checkBtn = document.getElementById("check-btn");
const feedback = document.getElementById("feedback");

const learnSection = document.getElementById("learn-section");
const quizSection = document.getElementById("quiz-section");
const learnModeBtn = document.getElementById("learn-mode-btn");
const quizModeBtn = document.getElementById("quiz-mode-btn");

// Helper to style cursive words
function setCursive(element, word) {
  element.textContent = word;
  element.style.fontFamily = '"Dancing Script", "Brush Script MT", cursive';
  element.style.fontSize = "2em";
}

// Helper to create a hover-to-reveal box for the print word
function setPrintWordHoverBox(element, word) {
  element.innerHTML = "";
  const box = document.createElement("div");
  box.className = "reveal-box";
  box.textContent = isTouchDevice() ? "Tap to reveal" : "Hover to reveal";
  // ... style as before ...

  if (isTouchDevice()) {
    box.addEventListener("click", () => {
      if (box.textContent === "Tap to reveal") {
        box.textContent = word;
        box.style.background = "#fff8dc";
        box.style.color = "#333";
        box.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
      } else {
        box.textContent = "Tap to reveal";
        box.style.background = "#e0e0e0";
        box.style.color = "#888";
        box.style.boxShadow = "none";
      }
    });
  } else {
    box.addEventListener("mouseenter", () => {
      box.textContent = word;
      box.style.background = "#fff8dc";
      box.style.color = "#333";
      box.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
    });
    box.addEventListener("mouseleave", () => {
      box.textContent = "Hover to reveal";
      box.style.background = "#e0e0e0";
      box.style.color = "#888";
      box.style.boxShadow = "none";
    });
  }
  element.appendChild(box);
}

// Load words from words.txt
fetch("words.txt")
  .then(response => response.text())
  .then(text => {
    // Split lines, remove empty, trim
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    words = lines.map(word => ({ print: word }));
    if (words.length === 0) {
      cursiveWord.textContent = "No words loaded!";
      printWord.innerHTML = "";
      quizCursive.textContent = "";
      return;
    }
    // Shuffle words for random order
    shuffle(words);
    currentIndex = 0;
    quizIndex = 0;
    // Initialize displays
    setCursive(cursiveWord, words[currentIndex].print);
    setPrintWordHoverBox(printWord, words[currentIndex].print);
    setCursive(quizCursive, words[quizIndex].print);
  })
  .catch(err => {
    cursiveWord.textContent = "Error loading words!";
    printWord.innerHTML = "";
    quizCursive.textContent = "";
    console.error(err);
  });

// Learn Mode - show a random word (not just next one)
nextBtn.addEventListener("click", () => {
  if (words.length === 0) return;
  let nextIndex;
  do {
    nextIndex = Math.floor(Math.random() * words.length);
  } while (nextIndex === currentIndex && words.length > 1); // Avoid repeating if possible
  currentIndex = nextIndex;
  const w = words[currentIndex];
  setCursive(cursiveWord, w.print);
  setPrintWordHoverBox(printWord, w.print);
});

// Quiz Mode - show a random word (not just next one)
checkBtn.addEventListener("click", () => {
  if (words.length === 0) return;
  const answer = quizInput.value.trim().toLowerCase();
  const correct = words[quizIndex].print.toLowerCase();
  if (answer === correct) {
    feedback.textContent = "✅ Correct!";
    feedback.style.color = "green";
    let nextQuizIndex;
    do {
      nextQuizIndex = Math.floor(Math.random() * words.length);
    } while (nextQuizIndex === quizIndex && words.length > 1); // Avoid repeating if possible
    quizIndex = nextQuizIndex;
    setCursive(quizCursive, words[quizIndex].print);
    quizInput.value = "";
  } else {
    feedback.textContent = "❌ Try again!";
    feedback.style.color = "red";
  }
});

// Mode Switching
learnModeBtn.addEventListener("click", () => {
  learnSection.classList.add("active");
  quizSection.classList.remove("active");
  learnModeBtn.classList.add("active");
  quizModeBtn.classList.remove("active");
});

quizModeBtn.addEventListener("click", () => {
  learnSection.classList.remove("active");
  quizSection.classList.add("active");
  quizModeBtn.classList.add("active");
  learnModeBtn.classList.remove("active");
});
