const words = [
  { cursive: "𝓗𝓮𝓵𝓵𝓸", print: "Hello" },
  { cursive: "𝓒𝓪𝓽", print: "Cat" },
  { cursive: "𝓑𝓸𝓸𝓴", print: "Book" },
  { cursive: "𝓢𝓬𝓱𝓸𝓸𝓵", print: "School" },
  { cursive: "𝓕𝓻𝓲𝓮𝓷𝓭", print: "Friend" },
  { cursive: "𝓛𝓸𝓿𝓮", print: "Love" },
  { cursive: "𝓦𝓻𝓲𝓽𝓲𝓷𝓰", print: "Writing" },
  { cursive: "𝓣𝓱𝓪𝓷𝓴", print: "Thank" },
];

let currentIndex = 0;

// Elements
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

// Learn Mode
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % words.length;
  const w = words[currentIndex];
  cursiveWord.textContent = w.cursive;
  printWord.textContent = w.print;
});

// Quiz Mode
let quizIndex = 0;

checkBtn.addEventListener("click", () => {
  const answer = quizInput.value.trim().toLowerCase();
  const correct = words[quizIndex].print.toLowerCase();
  if (answer === correct) {
    feedback.textContent = "✅ Correct!";
    feedback.style.color = "green";
    quizIndex = (quizIndex + 1) % words.length;
    quizCursive.textContent = words[quizIndex].cursive;
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
