const binaryInput = document.getElementById('binaryInput');
const errorMsg    = document.getElementById('errorMsg');
const resultNumber = document.getElementById('resultNumber');
const formulaBox  = document.getElementById('formulaBox');
const formulaText = document.getElementById('formulaText');
const clearBtn    = document.getElementById('clearBtn');

function handleInput() {
  const raw = binaryInput.value;

  // If empty, reset everything
  if (raw === '') {
    reset();
    return;
  }

  // Validate — remove all 0s and 1s, see if anything is left
  const invalid = raw.replace(/[01]/g, '');
  if (invalid.length > 0) {
    binaryInput.classList.add('error');
    errorMsg.textContent = 'Only 0s and 1s are allowed!';
    resultNumber.textContent = '—';
    formulaBox.style.display = 'none';
    return;
  }

  // Valid input — clear error
  binaryInput.classList.remove('error');
  errorMsg.textContent = '';

  const bits = raw;
  const len = bits.length;
  let decimal = 0;
  let formulaParts = [];
  let formulaValues = [];

  // Loop through each bit and calculate
  for (let i = 0; i < len; i++) {
    const bit = bits[i];
    const power = len - 1 - i;

    // Core math: each bit × 2 to the power of its position
    const value = parseInt(bit) * Math.pow(2, power);
    decimal += value;

    // Build the formula display
    if (bit === '1') {
      formulaParts.push('1 × 2^' + power);
      formulaValues.push(Math.round(value));
    } else {
      formulaParts.push('0 × 2^' + power);
      formulaValues.push('0');
    }
  }

  // Show result
  resultNumber.textContent = Math.round(decimal);

  // Show formula
  formulaBox.style.display = 'block';
  formulaText.innerHTML =
    formulaParts.join(' + ') +
    '<br>= ' + formulaValues.join(' + ') +
    '<br>= <strong>' + Math.round(decimal) + '</strong>';
}

function reset() {
  binaryInput.value = '';
  binaryInput.classList.remove('error');
  errorMsg.textContent = '';
  resultNumber.textContent = '—';
  formulaBox.style.display = 'none';
  formulaText.innerHTML = '';
}

// Listen for typing
binaryInput.addEventListener('input', handleInput);

// Clear button
clearBtn.addEventListener('click', reset);