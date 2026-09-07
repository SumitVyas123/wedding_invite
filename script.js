'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('openEnvelope');
  const envelope = document.getElementById('envelope');
  const envelopeScreen = document.getElementById('envelopeScreen');
  const romanticScene = document.getElementById('romanticScene');
  const petalLayer = document.getElementById('petalLayer');
  const scrollCue = document.getElementById('scrollCue');
  const blessingSection = document.getElementById('blessingSection');
  const scratchCanvas = document.getElementById('scratchCanvas');
  const scratchHeart = document.getElementById('scratchHeart');
  const scratchPrompt = document.getElementById('scratchPrompt');
  const saveDate = document.getElementById('saveDate');
  const confettiLayer = document.getElementById('confettiLayer');
  const closingSection = document.getElementById('closingSection');
  const languageButton = document.getElementById('languageButton');
  const languageLabel = document.getElementById('languageLabel');
  const soundButton = document.getElementById('soundButton');
  const soundIcon = document.getElementById('soundIcon');
  const soundLabel = document.getElementById('soundLabel');
  const weddingMusic = document.getElementById('weddingMusic');
  const controlToast = document.getElementById('controlToast');

  if (
    !button ||
    !envelope ||
    !envelopeScreen ||
    !romanticScene ||
    !petalLayer ||
    !scrollCue ||
    !blessingSection
  ) {
    console.error('The envelope elements could not be found.');
    return;
  }

  button.addEventListener('click', function () {
    if (envelope.classList.contains('is-opening')) return;

    button.disabled = true;
    createPetals(petalLayer);
    createSectionCornerPetals();
    romanticScene.classList.add('is-playing');
    envelope.classList.add('is-opening');

    window.setTimeout(function () {
      envelopeScreen.classList.add('is-finished');
      document.body.classList.add('page-ready');
    }, 4300);

    window.setTimeout(function () {
      romanticScene.classList.add('show-message');
    }, 4450);
  });

  scrollCue.addEventListener('click', function () {
    blessingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  const blessingObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          blessingSection.classList.add('is-visible');
          blessingObserver.disconnect();
        }
      });
    },
    { threshold: 0.28 }
  );

  blessingObserver.observe(blessingSection);

  setupScratchCard(
    scratchCanvas,
    scratchHeart,
    scratchPrompt,
    saveDate,
    confettiLayer
  );
  startCountdown();
  setupLanguageSwitch(
    languageButton,
    languageLabel,
    scratchPrompt,
    soundButton,
    soundLabel
  );
  setupSoundControl(
    soundButton,
    soundIcon,
    soundLabel,
    weddingMusic,
    controlToast
  );

  if (closingSection) {
    const closingObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            closingSection.classList.add('is-visible');
            closingObserver.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    closingObserver.observe(closingSection);
  }
});

const translations = {
  en: {
    family: 'Together with our families',
    welcomeShort: 'We are honored to welcome you<br>to the wedding ceremony of',
    brideName: 'Twinkle',
    groomName: 'Sumit',
    ampersand: '&amp;',
    scroll: 'Scroll down',
    blessingMessage:
      'We are honored to welcome you to the wedding ceremony of <strong>Twinkle and Sumit</strong> as they begin their journey together in faith and love. We thank you for being part of this blessed occasion.',
    scratch: 'Scratch to reveal',
    scratchHere: 'SCRATCH HERE',
    forever: 'Our forever begins',
    invited: "You're invited",
    date: '21 November 2026',
    day: 'Saturday',
    time: '8:00 PM',
    kindly: 'Kindly',
    saveDate: 'Save the Date',
    calendarMonth: 'NOV',
    counting: 'Counting down to forever',
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    venue: 'Venue',
    venueName: 'Shagun Palace and Lawn',
    city: 'Lucknow',
    maps: 'View on Google Maps',
    celebrate: "We can't wait to celebrate with you",
    signature: 'Twinkle &amp; Sumit',
    thanks: 'Thank You',
    tapOpen: 'Tap to open',
    sound: 'Sound',
    mute: 'Mute',
    musicSoon:
      'Wedding music will be added after moving the website to GitHub.',
  },
  hi: {
    family: 'हमारे परिवारों के साथ',
    welcomeShort:
      'ट्विंकल और सुमित के विवाह समारोह में<br>आपका हार्दिक स्वागत है',
    brideName: 'ट्विंकल',
    groomName: 'सुमित',
    ampersand: '&amp;',
    scroll: 'नीचे देखें',
    blessingMessage:
      'ट्विंकल और सुमित के विवाह समारोह में आपका हार्दिक स्वागत है, जहाँ वे प्रेम और विश्वास के साथ अपने नए जीवन की शुरुआत करेंगे। इस पावन अवसर का हिस्सा बनने के लिए आपका हृदय से धन्यवाद।',
    scratch: 'जानने के लिए स्क्रैच करें',
    scratchHere: 'यहाँ स्क्रैच करें',
    forever: 'हमारा हमेशा का साथ शुरू होता है',
    invited: 'आप सादर आमंत्रित हैं',
    date: '21 नवंबर 2026',
    day: 'शनिवार',
    time: 'रात 8:00 बजे',
    kindly: 'कृपया',
    saveDate: 'तिथि याद रखें',
    calendarMonth: 'नव॰',
    counting: 'हमेशा के साथ की उलटी गिनती',
    days: 'दिन',
    hours: 'घंटे',
    minutes: 'मिनट',
    seconds: 'सेकंड',
    venue: 'विवाह स्थल',
    venueName: 'शगुन पैलेस एंड लॉन',
    city: 'लखनऊ',
    maps: 'गूगल मैप पर देखें',
    celebrate: 'हम आपके साथ इस खुशी का उत्सव मनाने के लिए उत्सुक हैं',
    signature: 'ट्विंकल और सुमित',
    thanks: 'धन्यवाद',
    tapOpen: 'खोलने के लिए छुएँ',
    sound: 'संगीत',
    mute: 'बंद करें',
    musicSoon: 'विवाह संगीत वेबसाइट को GitHub पर ले जाने के बाद जोड़ा जाएगा।',
  },
};

let currentLanguage = 'en';

function setupLanguageSwitch(
  button,
  label,
  scratchPrompt,
  soundButton,
  soundLabel
) {
  if (!button || !label) return;
  button.addEventListener('click', function () {
    currentLanguage = currentLanguage === 'en' ? 'hi' : 'en';
    document.documentElement.lang = currentLanguage;
    document.querySelectorAll('[data-i18n]').forEach(function (element) {
      const key = element.getAttribute('data-i18n');
      if (translations[currentLanguage][key])
        element.innerHTML = translations[currentLanguage][key];
    });
    if (scratchPrompt && scratchPrompt.classList.contains('is-complete')) {
      scratchPrompt.textContent = translations[currentLanguage].forever;
    }
    label.textContent = currentLanguage === 'en' ? 'हिंदी' : 'English';
    if (soundLabel)
      soundLabel.textContent =
        soundButton && soundButton.classList.contains('is-playing')
          ? translations[currentLanguage].mute
          : translations[currentLanguage].sound;
    window.dispatchEvent(new CustomEvent('invitation-language-change'));
  });
}

function setupSoundControl(button, icon, label, audio, toast) {
  if (!button || !icon || !label || !audio) return;
  button.addEventListener('click', function () {
    if (!audio.getAttribute('src')) audio.src = audio.dataset.src;

    if (!audio.paused) {
      audio.pause();
      icon.textContent = '🔇';
      label.textContent = translations[currentLanguage].sound;
      button.classList.remove('is-playing');
      button.setAttribute('aria-pressed', 'false');
      return;
    }

    audio
      .play()
      .then(function () {
        icon.textContent = '🔊';
        label.textContent = translations[currentLanguage].mute;
        button.classList.add('is-playing');
        button.setAttribute('aria-pressed', 'true');
      })
      .catch(function () {
        showControlToast(toast, translations[currentLanguage].musicSoon);
      });
  });
}

function showControlToast(toast, message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.setTimeout(function () {
    toast.classList.remove('is-visible');
  }, 3200);
}

function startCountdown() {
  const weddingTime = new Date('2026-11-21T20:00:00+05:30').getTime();
  const fields = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
  };

  if (!fields.days || !fields.hours || !fields.minutes || !fields.seconds)
    return;

  function updateCountdown() {
    const distance = Math.max(0, weddingTime - Date.now());
    const days = Math.floor(distance / 86400000);
    const hours = Math.floor((distance % 86400000) / 3600000);
    const minutes = Math.floor((distance % 3600000) / 60000);
    const seconds = Math.floor((distance % 60000) / 1000);

    fields.days.textContent = String(days).padStart(2, '0');
    fields.hours.textContent = String(hours).padStart(2, '0');
    fields.minutes.textContent = String(minutes).padStart(2, '0');
    fields.seconds.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  window.setInterval(updateCountdown, 1000);
}

function setupScratchCard(canvas, heart, prompt, saveDate, confettiLayer) {
  if (!canvas || !heart || !prompt || !saveDate || !confettiLayer) return;

  const context = canvas.getContext('2d', { willReadFrequently: true });
  let scratching = false;
  let completed = false;
  let moves = 0;

  function paintCoating() {
    const bounds = heart.getBoundingClientRect();
    const scale = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(bounds.width * scale);
    canvas.height = Math.round(bounds.height * scale);
    context.setTransform(scale, 0, 0, scale, 0, 0);

    const gradient = context.createLinearGradient(
      0,
      0,
      bounds.width,
      bounds.height
    );
    gradient.addColorStop(0, '#e8c982');
    gradient.addColorStop(0.48, '#b88938');
    gradient.addColorStop(1, '#79511f');
    context.globalCompositeOperation = 'source-over';
    context.fillStyle = gradient;
    context.fillRect(0, 0, bounds.width, bounds.height);

    context.globalAlpha = 0.22;
    for (let i = 0; i < 850; i += 1) {
      context.fillStyle = i % 2 ? '#fff2bd' : '#684019';
      context.fillRect(
        Math.random() * bounds.width,
        Math.random() * bounds.height,
        Math.random() * 2.2,
        Math.random() * 1.2
      );
    }
    context.globalAlpha = 1;
    context.fillStyle = 'rgba(82,48,16,.82)';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.font =
      currentLanguage === 'hi'
        ? "600 14px 'Noto Serif Devanagari', serif"
        : '600 13px Cinzel, serif';
    context.fillText(
      translations[currentLanguage].scratchHere,
      bounds.width / 2,
      bounds.height / 2
    );
  }

  function scratch(event) {
    if (!scratching || completed) return;
    event.preventDefault();
    const bounds = canvas.getBoundingClientRect();
    const point = event.touches ? event.touches[0] : event;
    const x = point.clientX - bounds.left;
    const y = point.clientY - bounds.top;
    context.globalCompositeOperation = 'destination-out';
    context.beginPath();
    context.arc(x, y, Math.max(22, bounds.width * 0.075), 0, Math.PI * 2);
    context.fill();

    moves += 1;
    if (moves % 8 === 0 && scratchedEnough(context, canvas)) completeScratch();
  }

  function completeScratch() {
    if (completed) return;
    completed = true;
    context.clearRect(0, 0, canvas.width, canvas.height);
    heart.classList.add('is-complete');
    prompt.textContent = translations[currentLanguage].forever;
    prompt.classList.add('is-complete');
    saveDate.classList.add('is-visible');
    launchConfetti(confettiLayer);
  }

  canvas.addEventListener('pointerdown', function (event) {
    scratching = true;
    canvas.setPointerCapture(event.pointerId);
    scratch(event);
  });
  canvas.addEventListener('pointermove', scratch);
  canvas.addEventListener('pointerup', function () {
    scratching = false;
  });
  canvas.addEventListener('pointercancel', function () {
    scratching = false;
  });
  window.addEventListener('resize', function () {
    if (!completed) paintCoating();
  });
  window.addEventListener('invitation-language-change', function () {
    if (!completed) paintCoating();
  });
  paintCoating();
}

function scratchedEnough(context, canvas) {
  const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
  let transparent = 0;
  let sampled = 0;
  for (let index = 3; index < pixels.length; index += 64) {
    sampled += 1;
    if (pixels[index] < 40) transparent += 1;
  }
  return transparent / sampled > 0.34;
}

function launchConfetti(container) {
  const colors = [
    '#c99232',
    '#f2c96e',
    '#9b3f4d',
    '#e9899b',
    '#fff0c5',
    '#7d2940',
  ];
  for (let index = 0; index < 150; index += 1) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.style.setProperty('--left', Math.random() * 100 + 'vw');
    piece.style.setProperty('--width', 5 + Math.random() * 7 + 'px');
    piece.style.setProperty('--height', 8 + Math.random() * 12 + 'px');
    piece.style.setProperty('--drift', -150 + Math.random() * 300 + 'px');
    piece.style.setProperty('--rotation', 360 + Math.random() * 1080 + 'deg');
    piece.style.setProperty('--duration', 3.4 + Math.random() * 2.8 + 's');
    piece.style.setProperty('--delay', Math.random() * 0.9 + 's');
    piece.style.setProperty('--color', colors[index % colors.length]);
    container.appendChild(piece);
  }
  window.setTimeout(function () {
    container.replaceChildren();
  }, 7200);
}

function createPetals(container) {
  const colors = ['#ef9ca8', '#f5c0c9', '#fff3dc', '#d85e72', '#f0ad69'];

  for (let index = 0; index < 42; index += 1) {
    const petal = document.createElement('span');
    const onLeft = index % 2 === 0;
    petal.className = 'falling-petal';
    petal.style.left =
      (onLeft ? Math.random() * 15 : 85 + Math.random() * 15) + '%';
    petal.style.setProperty('--size', 7 + Math.random() * 11 + 'px');
    petal.style.setProperty('--fall-time', 7 + Math.random() * 8 + 's');
    petal.style.setProperty('--delay', Math.random() * -14 + 's');
    petal.style.setProperty('--drift', -80 + Math.random() * 160 + 'px');
    petal.style.setProperty('--spin', 180 + Math.random() * 540 + 'deg');
    petal.style.background = colors[index % colors.length];
    container.appendChild(petal);
  }
}

function createSectionCornerPetals() {
  const sections = document.querySelectorAll(
    '.blessing-section, .scratch-section, .details-section'
  );
  const colors = ['#ef9ca8', '#f5c0c9', '#fff0d2', '#d85e72', '#e7a85f'];

  sections.forEach(function (section, sectionIndex) {
    if (section.querySelector('.corner-petal-layer')) return;

    const layer = document.createElement('div');
    layer.className = 'corner-petal-layer';
    layer.setAttribute('aria-hidden', 'true');

    for (let index = 0; index < 18; index += 1) {
      const petal = document.createElement('span');
      const onLeft = index % 2 === 0;
      const edgePosition = Math.random() * 13;
      petal.className = 'corner-petal';
      petal.style.setProperty(
        '--left',
        onLeft ? edgePosition + '%' : 87 + edgePosition + '%'
      );
      petal.style.setProperty('--size', 7 + Math.random() * 10 + 'px');
      petal.style.setProperty('--fall-time', 8 + Math.random() * 7 + 's');
      petal.style.setProperty('--delay', -(Math.random() * 15) + 's');
      petal.style.setProperty('--sway', -22 + Math.random() * 44 + 'px');
      petal.style.setProperty('--drift', -38 + Math.random() * 76 + 'px');
      petal.style.setProperty('--spin', 220 + Math.random() * 500 + 'deg');
      petal.style.setProperty(
        '--petal-color',
        colors[(index + sectionIndex) % colors.length]
      );
      layer.appendChild(petal);
    }

    section.appendChild(layer);
  });
}
