// Load words.txt and initialize
let words = [];
let currentIndex = 0;
let quizIndex = 0;

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

// Load words from words.txt
fetch("words.txt")
  .then(response => response.text())
  .then(text => {
    // Split lines, remove empty, trim
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    words = lines.map(word => ({ print: word }));
    if (words.length === 0) {
      cursiveWord.textContent = "No words loaded!";
      printWord.textContent = "";
      quizCursive.textContent = "";
      return;
    }
    // Initialize displays
    setCursive(cursiveWord, words[0].print);
    printWord.textContent = words[0].print;
    setCursive(quizCursive, words[0].print);
  })
  .catch(err => {
    cursiveWord.textContent = "Error loading words!";
    printWord.textContent = "";
    quizCursive.textContent = "";
    console.error(err);
  });

// Learn Mode
nextBtn.addEventListener("click", () => {
  if (words.length === 0) return;
  currentIndex = (currentIndex + 1) % words.length;
  const w = words[currentIndex];
  setCursive(cursiveWord, w.print);
  printWord.textContent = w.print;
});

// Quiz Mode
checkBtn.addEventListener("click", () => {
  if (words.length === 0) return;
  const answer = quizInput.value.trim().toLowerCase();
  const correct = words[quizIndex].print.toLowerCase();
  if (answer === correct) {
    feedback.textContent = "✅ Correct!";
    feedback.style.color = "green";
    quizIndex = (quizIndex + 1) % words.length;
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
