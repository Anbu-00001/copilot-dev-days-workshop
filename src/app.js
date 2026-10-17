// UI code: connects the quiz logic (quiz.js) to the page (index.html).

const QUESTION_TIME_LIMIT = 15;
const TIMER_CIRCUMFERENCE = 100;
const state = {
  questions: [],
  current: 0,
  score: 0,
  streak: 0,
  bestStreak: 0,
  answered: false,
  timeLimit: QUESTION_TIME_LIMIT,
  timeLeft: QUESTION_TIME_LIMIT,
  timerId: null,
  deadline: null,
};

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const questionTotal = document.getElementById("question-total");
const progressText = document.getElementById("progress");
const progressTrack = document.querySelector(".progress-track");
const progressFill = document.getElementById("progress-fill");
const questionIndex = document.getElementById("question-index");
const timerElement = document.getElementById("timer");
const timerDisplay = document.getElementById("timer-display");
const timerProgress = document.getElementById("timer-progress");
const timerHint = document.getElementById("timer-hint");
const untimedLabel = document.getElementById("untimed-label");
const runModeLabel = document.getElementById("run-mode-label");
const questionText = document.getElementById("question-text");
const optionsList = document.getElementById("options");
const feedbackText = document.getElementById("feedback");
const nextButton = document.getElementById("next-btn");
const scoreText = document.getElementById("score-text");
const gradeText = document.getElementById("grade-text");
const scoreValue = document.getElementById("score-value");
const streakValue = document.getElementById("streak-value");
const accuracyValue = document.getElementById("accuracy-value");
const bestStreakValue = document.getElementById("best-streak-value");

function showScreen(screenToShow) {
  [startScreen, quizScreen, resultScreen].forEach((screen) => {
    screen.hidden = screen !== screenToShow;
  });
}

function stopTimer() {
  if (state.timerId !== null) {
    window.clearInterval(state.timerId);
    state.timerId = null;
  }
  state.deadline = null;
  timerElement.classList.add("is-stopped");
}

function updateTimer() {
  timerDisplay.textContent = String(state.timeLeft);
  timerProgress.style.strokeDashoffset = String(
    TIMER_CIRCUMFERENCE * (1 - state.timeLeft / state.timeLimit)
  );
  timerElement.classList.toggle("is-urgent", state.timeLeft > 0 && state.timeLeft <= 5);
  timerElement.classList.toggle("is-expired", state.timeLeft === 0);

  if (state.timeLeft === 0) {
    timerHint.textContent = "Time’s up. Take the next one.";
  } else if (state.timeLeft <= 5) {
    timerHint.textContent = "Final seconds. Trust your instinct.";
  } else {
    timerHint.textContent = "Trust your first instinct.";
  }
}

function startTimer() {
  state.timeLeft = state.timeLimit;
  timerElement.hidden = state.timeLimit === 0;
  untimedLabel.hidden = state.timeLimit !== 0;
  if (state.timeLimit === 0) return;

  state.deadline = Date.now() + state.timeLimit * 1000;
  timerElement.classList.remove("is-stopped");
  updateTimer();
  state.timerId = window.setInterval(() => {
    if (state.deadline === null) return;
    state.timeLeft = Math.max(0, Math.ceil((state.deadline - Date.now()) / 1000));
    updateTimer();
    if (state.timeLeft === 0) {
      handleTimeout();
    }
  }, 1000);
}

function startQuiz() {
  stopTimer();
  state.timeLimit = Number(
    document.querySelector('input[name="challenge-mode"]:checked').value
  );
  state.questions = shuffle(QUESTIONS);
  state.current = 0;
  state.score = 0;
  state.streak = 0;
  state.bestStreak = 0;
  runModeLabel.textContent = state.timeLimit === 0
    ? "/ PRACTICE"
    : state.timeLimit === QUESTION_TIME_LIMIT
      ? "/ SPRINT"
      : "/ STEADY";
  scoreValue.textContent = "0";
  streakValue.textContent = "0";
  progressTrack.setAttribute("aria-valuemax", String(state.questions.length));
  showScreen(quizScreen);
  renderQuestion();
}

function renderQuestion() {
  stopTimer();
  state.answered = false;
  const question = state.questions[state.current];
  const questionNumber = String(state.current + 1).padStart(2, "0");
  progressText.textContent = `${questionNumber} / ${String(state.questions.length).padStart(2, "0")}`;
  questionIndex.textContent = `QUESTION ${questionNumber}`;
  progressTrack.setAttribute("aria-valuenow", String(state.current + 1));
  progressFill.style.width = `${((state.current + 1) / state.questions.length) * 100}%`;
  questionText.textContent = question.question;
  feedbackText.textContent = "";
  nextButton.hidden = true;
  optionsList.innerHTML = "";

  question.options.forEach((option, index) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.className = "option";
    const key = document.createElement("span");
    key.className = "option-key";
    key.setAttribute("aria-hidden", "true");
    key.textContent = String.fromCharCode(65 + index);
    const text = document.createElement("span");
    text.className = "option-text";
    text.textContent = option;
    button.append(key, text);
    button.addEventListener("click", () => selectAnswer(index, button));
    item.appendChild(button);
    optionsList.appendChild(item);
  });

  questionText.focus();
  startTimer();
}

function selectAnswer(selectedIndex, selectedButton) {
  if (state.answered) return;
  if (isTimeExpired(state.deadline, Date.now())) {
    state.timeLeft = 0;
    updateTimer();
    handleTimeout();
    return;
  }
  stopTimer();
  state.answered = true;
  const question = state.questions[state.current];
  const buttons = optionsList.querySelectorAll("button");
  buttons.forEach((button) => (button.disabled = true));

  if (isCorrect(question, selectedIndex)) {
    state.score++;
    state.streak++;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
    scoreValue.textContent = String(state.score);
    streakValue.textContent = String(state.streak);
    selectedButton.classList.add("correct");
    feedbackText.textContent = "Nailed it. Keep that streak alive.";
  } else {
    state.streak = 0;
    streakValue.textContent = "0";
    selectedButton.classList.add("wrong");
    buttons[question.answer].classList.add("correct");
    feedbackText.textContent = "Not this time. The correct answer is highlighted.";
  }

  timerHint.textContent = "Answer locked.";
  nextButton.hidden = false;
  nextButton.focus();
}

function handleTimeout() {
  if (state.timerId === null || state.answered) return;
  stopTimer();
  state.answered = true;
  state.streak = 0;
  streakValue.textContent = "0";

  const question = state.questions[state.current];
  const buttons = optionsList.querySelectorAll("button");
  buttons.forEach((button) => (button.disabled = true));
  buttons[question.answer].classList.add("correct");
  feedbackText.textContent = "Time’s up. The correct answer is highlighted.";
  nextButton.hidden = false;
  nextButton.focus();
}

function nextQuestion() {
  stopTimer();
  state.current++;
  if (state.current < state.questions.length) {
    renderQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  stopTimer();
  const total = state.questions.length;
  const percentage = calculatePercentage(state.score, total);
  scoreText.textContent = `${state.score} of ${total} answers correct`;
  accuracyValue.textContent = `${percentage}%`;
  bestStreakValue.textContent = String(state.bestStreak);
  gradeText.textContent = getGrade(percentage);
  showScreen(resultScreen);
  document.getElementById("result-title").focus();
}

questionTotal.textContent = String(QUESTIONS.length).padStart(2, "0");
progressTrack.setAttribute("aria-valuemax", String(QUESTIONS.length));

document.getElementById("start-btn").addEventListener("click", startQuiz);
document.getElementById("restart-btn").addEventListener("click", startQuiz);
nextButton.addEventListener("click", nextQuestion);
