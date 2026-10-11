const step1 = document.getElementById('step-1');
const step2 = document.getElementById('step-2');
const step3 = document.getElementById('step-3');
const step4 = document.getElementById('step-4');

const unlockBtn = document.getElementById('unlock-btn');
const dangerTriggerBtn = document.getElementById('danger-trigger-btn');
const confirmBox = document.getElementById('confirm-box');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const rescueBtn = document.getElementById('rescue-btn');
const envelope = document.getElementById('envelope');
const finalLetter = document.getElementById('final-letter');
const moreConfettiBtn = document.getElementById('more-confetti-btn');

const hambozaHead = document.getElementById('hamboza-head');
const hambozaCenter = document.getElementById('hamboza-center');
const heroRescueContainer = document.getElementById('hero-rescue-container');

// Rose Modal elements
const roseModal = document.getElementById('rose-modal');
const closeModalBtn = document.getElementById('close-modal');
const eggRose = document.getElementById('egg-rose');

let audioCtx;
let osc1, osc2, gainNode;
let isAlarmPlaying = false;

function startEmergencyAlarm() {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  osc1 = audioCtx.createOscillator();
  osc2 = audioCtx.createOscillator();
  gainNode = audioCtx.createGain();

  osc1.type = 'sawtooth';
  osc2.type = 'sine';

  osc1.frequency.setValueAtTime(800, audioCtx.currentTime);
  osc2.frequency.setValueAtTime(400, audioCtx.currentTime);

  let flag = false;
  setInterval(() => {
    if (isAlarmPlaying && audioCtx) {
      osc1.frequency.setValueAtTime(flag ? 950 : 500, audioCtx.currentTime);
      flag = !flag;
    }
  }, 350);

  osc1.connect(gainNode);
  osc2.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);

  osc1.start();
  osc2.start();
  isAlarmPlaying = true;
}

function stopEmergencyAlarm() {
  if (isAlarmPlaying && audioCtx) {
    isAlarmPlaying = false;
    audioCtx.close();
  }
}

function playHBDMelody() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const notes = [
    {f: 261.63, d: 0.3}, {f: 261.63, d: 0.3}, {f: 293.66, d: 0.6}, {f: 261.63, d: 0.6}, {f: 349.23, d: 0.6}, {f: 329.63, d: 1.0},
    {f: 261.63, d: 0.3}, {f: 261.63, d: 0.3}, {f: 293.66, d: 0.6}, {f: 261.63, d: 0.6}, {f: 392.00, d: 0.6}, {f: 349.23, d: 1.0}
  ];

  let time = ctx.currentTime;
  notes.forEach(note => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.frequency.value = note.f;
    osc.connect(g);
    g.connect(ctx.destination);
    g.gain.setValueAtTime(0.2, time);
    g.gain.exponentialRampToValueAtTime(0.001, time + note.d);
    osc.start(time);
    osc.stop(time + note.d);
    time += note.d + 0.05;
  });
}

function playPopSound() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(400, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1);
  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.1);
}

function showSecretNote(msg) {
  playPopSound();
  alert(msg);
}

// Rose Modal Logic
eggRose.addEventListener('click', () => {
  playPopSound();
  roseModal.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => {
  roseModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === roseModal) {
    roseModal.style.display = 'none';
  }
});

// 🎯 Real Live Countdown Target: october 13th
const targetDate = new Date("october 13, 2026 00:00:00").getTime();

const liveTimer = setInterval(() => {
  const now = new Date().getTime();
  const difference = targetDate - now;

  if (difference > 0) {
    const d = Math.floor(difference / (1000 * 60 * 60 * 24));
    const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = d < 10 ? '0' + d : d;
    document.getElementById('hours').textContent = h < 10 ? '0' + h : h;
    document.getElementById('minutes').textContent = m < 10 ? '0' + m : m;
    document.getElementById('seconds').textContent = s < 10 ? '0' + s : s;
  } else {
    clearInterval(liveTimer);
    document.getElementById('timer-box').style.display = 'none';
    unlockBtn.style.display = 'inline-block';
  }
}, 1000);

unlockBtn.addEventListener('click', () => {
  step1.classList.remove('active');
  step2.classList.add('active');
});

dangerTriggerBtn.addEventListener('click', () => {
  confirmBox.style.display = 'block';
});

noBtn.addEventListener('click', () => {
  alert("Smart choice Faroha! But you can't escape forever... 😉");
});

yesBtn.addEventListener('click', () => {
  step2.classList.remove('active');
  step3.classList.add('active');
  
  startEmergencyAlarm();

  setTimeout(() => {
    hambozaHead.classList.add('peek-in');
  }, 1500);

  setTimeout(() => {
    hambozaHead.classList.remove('peek-in');
    hambozaCenter.style.display = 'flex';
  }, 4000);

  setTimeout(() => {
    hambozaCenter.style.display = 'none';
    heroRescueContainer.style.display = 'flex';
  }, 10500);
});

rescueBtn.addEventListener('click', () => {
  stopEmergencyAlarm();
  playHBDMelody();

  step3.classList.remove('active');
  step4.classList.add('active');
});

envelope.addEventListener('click', () => {
  playPopSound();
  envelope.style.display = 'none';
  finalLetter.style.display = 'block';

  confetti({
    particleCount: 250,
    spread: 140,
    origin: { y: 0.6 }
  });
});

moreConfettiBtn.addEventListener('click', () => {
  playPopSound();
  confetti({
    particleCount: 200,
    spread: 120,
    origin: { y: 0.6 }
  });
});