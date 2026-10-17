// Core quiz logic.
// This file has NO browser (DOM) code so it can be tested with Node.js.

/**
 * Returns a new array with the items in random order.
 * The original array is not changed.
 */
function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Returns true when the selected option is the correct one.
 */
function isCorrect(question, selectedIndex) {
  return question.answer === selectedIndex;
}

/**
 * Converts a score into a whole-number percentage (0-100).
 */
function calculatePercentage(score, total) {
  if (total === 0) return 0;
  return Math.round((score / total) * 100);
}

/**
 * Turns a percentage into a grade.
 * A = 90% or more, B = 75% or more, C = 50% or more.
 */
function getGrade(percentage) {
  if (percentage >= 90) return "A";
  if (percentage >= 75) return "B";
  if (percentage >= 50) return "C";
  return "Keep practicing";
}

/**
 * Formats a non-negative countdown value for display.
 */
function formatTimeLeft(seconds) {
  return `⏱ ${Math.max(0, Math.ceil(seconds))}s`;
}

function isTimeExpired(deadline, now) {
  return deadline !== null && now >= deadline;
}

function getAnswerShortcutIndex(key) {
  if (typeof key !== "string" || key.length !== 1) return -1;
  if (/^[1-4]$/.test(key)) return Number(key) - 1;

  const index = key.toLowerCase().charCodeAt(0) - 97;
  return index >= 0 && index < 4 ? index : -1;
}

// Lets Node.js tests load this file. Browsers ignore this block.
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    shuffle,
    isCorrect,
    calculatePercentage,
    getGrade,
    formatTimeLeft,
    isTimeExpired,
    getAnswerShortcutIndex,
  };
}
