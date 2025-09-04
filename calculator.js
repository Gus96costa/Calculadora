/* Calculadora - lógica com suporte a teclado e histórico */

const exprEl = document.getElementById('expr');
const resultEl = document.getElementById('result');
const keysEl = document.querySelector('.keys');
const historyList = document.getElementById('history-list');
const clearHistoryBtn = document.getElementById('clear-history');
const themeBtn = document.getElementById('theme-btn');

let current = '0';
let expression = '';
let lastWasEquals = false;

function formatNumber(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 'Erro';
  const parts = n.toString().split('.');
  const intPart = parts[0];
  const decPart = parts[1];
  const intFormatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return decPart ? `${intFormatted},${decPart}` : intFormatted;
}

function parseInputNumber(display) {
  return Number(display.replaceAll('.', '').replace(',', '.'));
}

function appendToHistory(item) {
  const li = document.createElement('li');
  li.textContent = item;
  historyList.prepend(li);
}

function clearHistory() {
  historyList.innerHTML = '';
}

function updateDisplay() {
  exprEl.textContent = expression || '\u00A0';
  resultEl.textContent = current;
}

function resetAll() {
  current = '0';
  expression = '';
  lastWasEquals = false;
  updateDisplay();
}

function inputDigit(d) {
  if (lastWasEquals) {
    current = '0';
    expression = '';
    lastWasEquals = false;
  }
  if (current === '0') current = d;
  else current += d;
  updateDisplay();
}

function inputComma() {
  if (lastWasEquals) {
    current = '0';
    expression = '';
    lastWasEquals = false;
  }
  if (!current.includes(',')) current += ',';
  updateDisplay();
}

function toggleSign() {
  if (current.startsWith('-')) current = current.slice(1);
  else if (current !== '0') current = '-' + current;
  updateDisplay();
}

function applyPercent() {
  const val = parseInputNumber(current);
  current = formatNumber(String(val / 100));
  updateDisplay();
}

function operate(op) {
  // Map visual op to JS op
  const mapped = op;
  const val = parseInputNumber(current);
  if (expression && /[+\-*/]$/.test(expression)) {
    expression = expression.slice(0, -1) + mapped;
  } else {
    expression += (expression ? ' ' : '') + String(val) + ' ' + mapped;
  }
  current = '0';
  updateDisplay();
}

function backspace() {
  if (lastWasEquals) return;
  if (current.length <= 1 || (current.length === 2 && current.startsWith('-'))) current = '0';
  else current = current.slice(0, -1);
  updateDisplay();
}

function evaluateExpr() {
  const val = parseInputNumber(current);
  let full = expression ? `${expression} ${val}` : String(val);
  if (!full.trim()) return;
  try {
    const jsExpr = full.replaceAll(',', '.');
    // eslint-disable-next-line no-new-func
    const result = Function(`"use strict"; return(${jsExpr});`)();
    const formatted = formatNumber(String(result));
    appendToHistory(`${full.replaceAll('.', ',')} = ${formatted}`);
    current = formatted;
    expression = '';
    lastWasEquals = true;
    updateDisplay();
  } catch (e) {
    current = 'Erro';
    expression = '';
    lastWasEquals = true;
    updateDisplay();
  }
}

function handleKey(key) {
  if (/^\d$/.test(key)) return inputDigit(key);
  if (key === ',') return inputComma();
  if (key === 'swap') return toggleSign();
  if (key === '%') return applyPercent();
  if (key === '+' || key === '-' || key === '*' || key === '/') return operate(key);
  if (key === 'Enter' || key === '=') return evaluateExpr();
  if (key === 'Backspace') return backspace();
  if (key === 'Escape') return resetAll();
}

keysEl.addEventListener('click', function (e) {
  const target = e.target.closest('button[data-key]');
  if (!target) return;
  const k = target.getAttribute('data-key');
  handleKey(k);
});

document.addEventListener('keydown', function (e) {
  if (e.key === '.') { e.preventDefault(); handleKey(','); return; }
  if (e.key === 'Enter') { e.preventDefault(); handleKey('Enter'); return; }
  handleKey(e.key);
});

clearHistoryBtn.addEventListener('click', clearHistory);

themeBtn.addEventListener('click', function () {
  const isLight = document.body.classList.toggle('light');
  themeBtn.textContent = isLight ? '☀️' : '🌙';
});

resetAll();
