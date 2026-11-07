// Genial Inc. theme — progressive enhancements (the site works without JavaScript).
// Loaded as an ES module, so it runs after the document has been parsed.

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// --- Mobile menu --------------------------------------------------------------
const setupMenu = () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById(toggle?.getAttribute('aria-controls') ?? '');
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? toggle.dataset.labelClose : toggle.dataset.labelOpen);
    toggle.classList.toggle('active', open);
    nav.classList.toggle('active', open);
  };

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  // Close the menu after choosing a link (mostly anchors on the home page).
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
};

// --- Projects carousel ---------------------------------------------------------
const setupCarousels = () => {
  for (const carousel of document.querySelectorAll('[data-carousel]')) {
    const track = carousel.querySelector('[data-carousel-track]');
    const slides = [...carousel.querySelectorAll('[data-carousel-slide]')];
    if (!track || slides.length < 2) continue;

    const currentIndex = () => {
      const start = track.getBoundingClientRect().left;
      let best = 0;
      slides.forEach((slide, index) => {
        const distance = Math.abs(slide.getBoundingClientRect().left - start);
        const bestDistance = Math.abs(slides[best].getBoundingClientRect().left - start);
        if (distance < bestDistance) best = index;
      });
      return best;
    };

    const goTo = (index) => {
      const target = slides[(index + slides.length) % slides.length];
      track.scrollTo({
        left: target.offsetLeft - track.offsetLeft,
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      });
    };

    carousel.querySelector('[data-carousel-prev]')
      ?.addEventListener('click', () => goTo(currentIndex() - 1));
    carousel.querySelector('[data-carousel-next]')
      ?.addEventListener('click', () => goTo(currentIndex() + 1));
  }
};

// --- "Who is the best-looking?" poll -------------------------------------------
// There is no server: the vote is only remembered in this browser.
const POLL_KEY = 'genial-poll-vote';

const readVote = () => {
  try {
    return localStorage.getItem(POLL_KEY);
  } catch {
    return null;
  }
};

const saveVote = (value) => {
  try {
    localStorage.setItem(POLL_KEY, value);
  } catch {
    // Storage can be unavailable (private browsing, blocked cookies…): ignore.
  }
};

const setupPoll = () => {
  const form = document.querySelector('[data-poll]');
  if (!form) return;
  const status = form.querySelector('[data-poll-status]');

  const thank = (name) => {
    if (status) status.textContent = form.dataset.thanks.replace('{name}', name);
  };

  const previous = readVote();
  if (previous) {
    const radio = [...form.querySelectorAll('input[name="poll"]')].find((input) => input.value === previous);
    if (radio) {
      radio.checked = true;
      thank(previous);
    }
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const vote = new FormData(form).get('poll');
    if (!vote) return;
    saveVote(vote);
    thank(vote);
  });
};

setupMenu();
setupCarousels();
setupPoll();
