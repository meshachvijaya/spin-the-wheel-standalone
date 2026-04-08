// Spin the Wheel logic
const wheel = document.getElementById('wheel');
const spinBtn = document.getElementById('spinBtn');
const resultEl = document.getElementById('result');

// Urutan label searah jarum jam, mulai dari atas (12 o'clock)
const labels = [
  '200 points',
  'JACKPOT',
  '500 points',
  'ZONK',
  '1000 points',
  'One More Spin'
];

const sliceOffsetDeg = 60; // Calibration
const slices = labels.length;
const sliceAngle = 360 / slices;

let spinning = false;
let currentAngle = 0;

function spin() {
  if (spinning) return;
  spinning = true;
  spinBtn.disabled = true;
  resultEl.textContent = 'Spinning...';

  const targetIndex = Math.floor(Math.random() * slices);
  const min = targetIndex * sliceAngle;
  const max = (targetIndex + 1) * sliceAngle;
  const targetAngleWithinSlice = Math.random() * (max - min) + min;

  const turns = 5 + Math.floor(Math.random() * 3); // 5–7 putaran penuh
  const targetGlobalAngle = turns * 360 + (360 - targetAngleWithinSlice) + sliceOffsetDeg;

  const duration = 4200 + Math.random() * 1200; // 4.2–5.4s
  wheel.style.setProperty('--duration', duration + 'ms');
  currentAngle = targetGlobalAngle % 360;
  wheel.style.setProperty('--angle', targetGlobalAngle + 'deg');

  const onDone = () => {
    wheel.removeEventListener('transitionend', onDone);
    const final = (360 - (currentAngle - sliceOffsetDeg)) % 360;
    const index = Math.floor(final / sliceAngle) % slices;
    const prize = labels[index];
    resultEl.textContent = '🎉 You get: ' + prize + '!';
    spinning = false;
    spinBtn.disabled = false;
  };

  wheel.addEventListener('transitionend', onDone);
}

spinBtn.addEventListener('click', spin);
