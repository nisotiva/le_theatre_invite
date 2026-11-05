const body = document.body;
const card = document.querySelector('#invitation');
const openButton = document.querySelector('#open-card');
const closeButton = document.querySelector('#close-card');
const letter = document.querySelector('#letter');
const heading = document.querySelector('#salutation');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let transitionTimer;
let showTimer;
let isOpen = false;

// No navigation, audio or external requests are triggered by opening the card.
function openCard() {
  if (isOpen) return;
  isOpen = true;
  clearTimeout(transitionTimer);
  openButton.setAttribute('aria-expanded', 'true');
  openButton.disabled = true;
  body.classList.add('is-opening');
  function reveal() {
    body.classList.add('is-open');
    card.classList.add('is-open');
    letter.inert = false;
    closeButton.hidden = false;
    transitionTimer = setTimeout(() => {
      openButton.hidden = true;
      heading.focus({ preventScroll: true });
      body.classList.remove('is-opening');
    }, reducedMotion.matches ? 40 : 2700);
  }
  if (reducedMotion.matches) reveal();
  else showTimer = setTimeout(reveal, 1450);
}
function closeCard() {
  if (!isOpen) return;
  isOpen = false;
  clearTimeout(transitionTimer);
  clearTimeout(showTimer);
  openButton.hidden = false;
  openButton.disabled = false;
  openButton.setAttribute('aria-expanded', 'false');
  letter.inert = true;
  closeButton.hidden = true;
  requestAnimationFrame(() => {
    body.classList.remove('is-open', 'is-opening');
    card.classList.remove('is-open');
    openButton.focus({ preventScroll: true });
  });
}
openButton.addEventListener('click', openCard);
closeButton.addEventListener('click', closeCard);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && isOpen) closeCard();
});

// A small, finite set of stage-dust glints; transforms and opacity only.
const dust = document.querySelector('.dust');
for (let i = 0; i < 22; i++) {
  const mote = document.createElement('i');
  mote.style.setProperty('--x', `${(i * 37 + 11) % 100}%`);
  mote.style.setProperty('--y', `${(i * 23 + 7) % 100}%`);
  mote.style.setProperty('--delay', `${-(i * .73)}s`);
  mote.style.setProperty('--duration', `${8 + (i % 6)}s`);
  dust.append(mote);
}
