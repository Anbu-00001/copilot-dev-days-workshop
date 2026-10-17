// Tests use Node's built-in test runner, so nothing needs to be installed.
// Run them with:  npm test
const { test } = require("node:test");
const assert = require("node:assert/strict");
const {
  shuffle,
  isCorrect,
  calculatePercentage,
  getGrade,
  formatTimeLeft,
  isTimeExpired,
  getAnswerShortcutIndex,
} = require("../src/quiz.js");

test("isCorrect returns true for the right answer", () => {
  assert.equal(isCorrect({ answer: 2 }, 2), true);
});

test("isCorrect returns false for a wrong answer", () => {
  assert.equal(isCorrect({ answer: 2 }, 0), false);
});

test("calculatePercentage rounds to a whole number", () => {
  assert.equal(calculatePercentage(2, 3), 67);
});

test("calculatePercentage returns 0 when there are no questions", () => {
  assert.equal(calculatePercentage(0, 0), 0);
});

test("shuffle keeps every item and does not change the original array", () => {
  const original = [1, 2, 3, 4, 5];
  const result = shuffle(original);
  assert.deepEqual([...result].sort(), [1, 2, 3, 4, 5]);
  assert.deepEqual(original, [1, 2, 3, 4, 5]);
});

test("getGrade includes each documented grade boundary", () => {
  assert.equal(getGrade(90), "A");
  assert.equal(getGrade(75), "B");
  assert.equal(getGrade(50), "C");
});

test("formatTimeLeft includes the remaining seconds", () => {
  assert.equal(formatTimeLeft(12), "⏱ 12s");
});

test("formatTimeLeft rounds fractions up and clamps negative values", () => {
  assert.equal(formatTimeLeft(1.2), "⏱ 2s");
  assert.equal(formatTimeLeft(-1), "⏱ 0s");
});

test("isTimeExpired handles deadlines and the exact expiry instant", () => {
  assert.equal(isTimeExpired(null, 1000), false);
  assert.equal(isTimeExpired(1000, 999), false);
  assert.equal(isTimeExpired(1000, 1000), true);
  assert.equal(isTimeExpired(1000, 1001), true);
});

test("getAnswerShortcutIndex maps A-D keys to answer indexes", () => {
  assert.equal(getAnswerShortcutIndex("a"), 0);
  assert.equal(getAnswerShortcutIndex("B"), 1);
  assert.equal(getAnswerShortcutIndex("c"), 2);
  assert.equal(getAnswerShortcutIndex("D"), 3);
});

test("getAnswerShortcutIndex ignores other or multi-character keys", () => {
  assert.equal(getAnswerShortcutIndex("e"), -1);
  assert.equal(getAnswerShortcutIndex("Tab"), -1);
  assert.equal(getAnswerShortcutIndex(" "), -1);
  assert.equal(getAnswerShortcutIndex(""), -1);
});
