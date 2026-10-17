// UI code: connects the quiz logic (quiz.js) to the page (index.html).

const QUESTION_TIME_LIMIT = 15;
const TIMER_CIRCUMFERENCE = 100;
const state = {
  questions: [],
  current: 0,
  score: 0,
  timeLeft: QUESTION_TIME_LIMIT,
  timerId: null,
  deadline: null,
};

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const progressText = document.getElementById("progress");
const timerElement = document.getElementById("timer");
const timerDisplay = document.getElementById("timer-display");
const timerProgress = document.getElementById("timer-progress");
const timerHint = document.getElementById("timer-hint");
const questionText = document.getElementById("question-text");
const optionsList = document.getElementById("options");
const feedbackText = document.getElementById("feedback");
const nextButton = document.getElementById("next-btn");
const scoreText = document.getElementById("score-text");
const gradeText = document.getElementById("grade-text");

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
  timerDisplay.textContent = formatTimeLeft(state.timeLeft);
  timerProgress.style.strokeDashoffset = String(
    TIMER_CIRCUMFERENCE * (1 - state.timeLeft / QUESTION_TIME_LIMIT)
  );
  timerElement.classList.toggle("is-urgent", state.timeLeft > 0 && state.timeLeft <= 5);
  timerElement.classList.toggle("is-expired", state.timeLeft === 0);

  if (state.timeLeft === 0) {
    timerHint.textContent = "The clock ran out—keep going!";
  } else if (state.timeLeft <= 5) {
    timerHint.textContent = "Quick! Lock in your answer!";
  } else {
    timerHint.textContent = "Lock in your answer before time runs out.";
  }
}

function startTimer() {
  state.timeLeft = QUESTION_TIME_LIMIT;
  state.deadline = Date.now() + QUESTION_TIME_LIMIT * 1000;
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
  state.questions = shuffle(QUESTIONS);
  state.current = 0;
  state.score = 0;
  showScreen(quizScreen);
  renderQuestion();
}

function renderQuestion() {
  stopTimer();
  const question = state.questions[state.current];
  progressText.textContent = `Question ${state.current + 1} of ${state.questions.length}`;
  questionText.textContent = question.question;
  feedbackText.textContent = "";
  nextButton.hidden = true;
  optionsList.innerHTML = "";

  question.options.forEach((option, index) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.className = "option";
    button.textContent = option;
    button.addEventListener("click", () => selectAnswer(index, button));
    item.appendChild(button);
    optionsList.appendChild(item);
  });

  startTimer();
}

function selectAnswer(selectedIndex, selectedButton) {
  if (state.timerId === null) return;
  if (isTimeExpired(state.deadline, Date.now())) {
    state.timeLeft = 0;
    updateTimer();
    handleTimeout();
    return;
  }
  stopTimer();
  const question = state.questions[state.current];
  const buttons = optionsList.querySelectorAll("button");
  buttons.forEach((button) => (button.disabled = true));

  if (isCorrect(question, selectedIndex)) {
    state.score++;
    selectedButton.classList.add("correct");
    feedbackText.textContent = "Correct!";
  } else {
    selectedButton.classList.add("wrong");
    buttons[question.answer].classList.add("correct");
    feedbackText.textContent = "Not quite. The correct answer is highlighted.";
  }

  timerHint.textContent = "Locked in—nice one!";
  nextButton.hidden = false;
  nextButton.focus();
}

function handleTimeout() {
  if (state.timerId === null) return;
  stopTimer();

  const question = state.questions[state.current];
  const buttons = optionsList.querySelectorAll("button");
  buttons.forEach((button) => (button.disabled = true));
  buttons[question.answer].classList.add("correct");
  feedbackText.textContent = "Time's up! The correct answer is highlighted.";
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
  scoreText.textContent = `You scored ${state.score} out of ${total} (${percentage}%)`;
  gradeText.textContent = `Grade: ${getGrade(percentage)}`;
  showScreen(resultScreen);
}

document.getElementById("start-btn").addEventListener("click", startQuiz);
document.getElementById("restart-btn").addEventListener("click", startQuiz);
nextButton.addEventListener("click", nextQuestion);
