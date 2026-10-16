const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-nav');
const themeToggle = document.querySelector('.theme-toggle');

function setTheme(theme) {
  const isLight = theme === 'light';
  document.documentElement.dataset.theme = isLight ? 'light' : 'dark';
  themeToggle.setAttribute('aria-pressed', String(isLight));
  themeToggle.setAttribute('aria-label', `Switch to ${isLight ? 'dark' : 'light'} theme`);
  themeToggle.querySelector('.theme-icon').textContent = isLight ? '☾' : '☼';
  themeToggle.querySelector('.theme-label').textContent = isLight ? 'Dark theme' : 'Light theme';
  document.querySelector('meta[name="theme-color"]').content = isLight ? '#f4f3eb' : '#101411';
}

let savedTheme = 'dark';
try {
  savedTheme = localStorage.getItem('devfolio-theme') || 'dark';
} catch {
  savedTheme = 'dark';
}
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(nextTheme);
  try {
    localStorage.setItem('devfolio-theme', nextTheme);
  } catch {}
});

function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('is-open');
}

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navigation.classList.toggle('is-open', !isOpen);
});

navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

const revealItems = document.querySelectorAll('.reveal');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');
const projectCount = document.querySelector('#project-count');
const filterStatus = document.querySelector('#filter-status');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    let visibleCount = 0;

    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle('is-active', isActive);
      filterButton.setAttribute('aria-pressed', String(isActive));
    });

    projectCards.forEach((card) => {
      const technologies = card.dataset.tech.split(' ');
      const isVisible = filter === 'all' || technologies.includes(filter);
      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    projectCount.textContent = String(visibleCount).padStart(2, '0');
    filterStatus.textContent = filter === 'all'
      ? `Showing all ${visibleCount} projects`
      : `Showing ${visibleCount} ${button.textContent} ${visibleCount === 1 ? 'project' : 'projects'}`;
  });
});

const articleFilterButtons = document.querySelectorAll('.article-filter');
const articleSearch = document.querySelector('#article-search');
const articleList = document.querySelector('#article-list');
const articleEmpty = document.querySelector('#article-empty');
const articleStatus = document.querySelector('#article-status');
const showMoreButton = document.querySelector('#show-more');
const articles = [
  { title: 'Multilingual Dictionary App Using Python', url: 'https://www.geeksforgeeks.org/multilingual-dictionary-app-using-python/', categories: ['programming'] },
  { title: 'Create a Chrome Extension with HTML, CSS, and JavaScript', url: 'https://www.geeksforgeeks.org/create-a-chrome-extension-in-html-css-javascript/', categories: ['web-development', 'programming'] },
  { title: 'Edit Text Files in Linux', url: 'https://www.geeksforgeeks.org/how-to-edit-text-files-in-linux/', categories: ['linux-tools'] },
  { title: 'Build a Music Player with Tkinter and Pygame in Python', url: 'https://www.geeksforgeeks.org/build-a-music-player-with-tkinter-and-pygame-in-python/?utm_source=auth&utm_medium=saved&utm_campaign=articles', categories: ['programming'] },
  { title: 'Contact Us Form Using Next.js', url: 'https://www.geeksforgeeks.org/contact-us-form-using-next-js/', categories: ['web-development'] },
  { title: 'How to Count Lines in a Git Repository', url: 'https://www.geeksforgeeks.org/how-to-count-number-of-lines-in-a-git-repository/', categories: ['linux-tools'] },
  { title: 'Telecom Customer Churn Analysis in R', url: 'https://www.geeksforgeeks.org/telecom-customer-churn-analysis-in-r/', categories: ['data-analysis'] },
  { title: 'File Upload Using Selenium WebDriver and Java Robot Class', url: 'https://www.geeksforgeeks.org/file-upload-using-selenium-webdriver-and-java-robot-class/', categories: ['programming', 'web-development'] },
  { title: 'How Many Zeros in 100 Crore?', url: 'https://www.geeksforgeeks.org/how-many-zeros-in-100-crore/', categories: ['mathematics'] },
  { title: 'Differentiation', url: 'https://www.geeksforgeeks.org/differentiation/', categories: ['mathematics'] },
  { title: 'VIT-AP University Campus Experience', url: 'https://www.geeksforgeeks.org/vit-ap-university-campus-experience/', categories: ['education-experiences'] },
  { title: 'Bromine Water Test', url: 'https://www.geeksforgeeks.org/bromine-water-test/', categories: ['science'] },
  { title: 'How to Create a Google Form', url: 'https://www.geeksforgeeks.org/how-to-create-google-form/', categories: ['web-development', 'linux-tools'] },
  { title: 'How to Make a Google Form Public to Everyone', url: 'https://www.geeksforgeeks.org/how-to-make-google-form-public-to-everyone/', categories: ['web-development', 'linux-tools'] },
  { title: 'Convert Bool True/False to a String in Python', url: 'https://www.geeksforgeeks.org/how-to-convert-bool-true-false-to-a-string-in-python/', categories: ['programming'] },
  { title: 'Derivative of Tan Inverse x', url: 'https://www.geeksforgeeks.org/derivative-of-tan-inverse-x/', categories: ['mathematics'] },
  { title: 'Square Root of 9', url: 'https://www.geeksforgeeks.org/square-root-of-9/', categories: ['mathematics'] },
  { title: 'Power Triangle', url: 'https://www.geeksforgeeks.org/power-triangle/', categories: ['mathematics'] },
  { title: 'Derivative of Sec x', url: 'https://www.geeksforgeeks.org/derivative-of-sec-x/', categories: ['mathematics'] },
  { title: 'Square Root of 121', url: 'https://www.geeksforgeeks.org/square-root-of-121/', categories: ['mathematics'] },
  { title: 'Create a Banner Using Applet', url: 'https://www.geeksforgeeks.org/how-to-create-a-banner-using-applet/', categories: ['programming'] },
  { title: 'Share Google Map Location on WhatsApp', url: 'https://www.geeksforgeeks.org/how-to-share-google-map-location-on-whatsapp/', categories: ['linux-tools'] },
  { title: 'Cube Root of 9261', url: 'https://www.geeksforgeeks.org/cube-root-of-9261/', categories: ['mathematics'] },
  { title: 'LCM of 8 and 12', url: 'https://www.geeksforgeeks.org/lcm-of-8-and-12/', categories: ['mathematics'] },
  { title: 'Add Date and Time in Google Sheets', url: 'https://www.geeksforgeeks.org/how-to-add-date-and-time-in-google-sheets/', categories: ['linux-tools', 'data-analysis'] },
  { title: 'Sin A Sin B Formula', url: 'https://www.geeksforgeeks.org/sin-a-sin-b-formula/', categories: ['mathematics'] },
  { title: 'Unit of Force', url: 'https://www.geeksforgeeks.org/unit-of-force/', categories: ['science'] },
  { title: 'Derivative of log x', url: 'https://www.geeksforgeeks.org/derivative-of-log-x/', categories: ['mathematics'] },
  { title: '5 Ways to Take Screenshots on Arch Linux', url: 'https://www.geeksforgeeks.org/5-ways-to-take-screenshots-on-arch-linux/', categories: ['linux-tools'] },
  { title: 'Derivative of 2 to the x', url: 'https://www.geeksforgeeks.org/derivative-of-2-to-the-x/', categories: ['mathematics'] },
  { title: 'Cube Root of Unity: Formula and Properties', url: 'https://www.geeksforgeeks.org/cube-root-of-unity-formula-properties/', categories: ['mathematics'] },
  { title: 'JavaScript Program to Print with Your Own Font', url: 'https://www.geeksforgeeks.org/javascript-program-to-print-with-your-own-font/', categories: ['programming', 'web-development'] },
  { title: 'My 12th Board Exam Experience', url: 'https://www.geeksforgeeks.org/my-12th-board-exam-experience/', categories: ['education-experiences'] },
  { title: 'Standard Normal Distribution', url: 'https://www.geeksforgeeks.org/standard-normal-distribution/', categories: ['mathematics', 'data-analysis'] },
  { title: '12th Board Exam Preparation Experience', url: 'https://www.geeksforgeeks.org/12th-board-exam-preparation-experience/', categories: ['education-experiences'] },
  { title: 'Practice Questions on Quadratic Equations', url: 'https://www.geeksforgeeks.org/practice-questions-on-quadratic-equations/', categories: ['mathematics'] },
  { title: 'Trigonometric Ratios: Practice Questions', url: 'https://www.geeksforgeeks.org/trigonometric-ratios-practice-questions/', categories: ['mathematics'] },
  { title: 'A Plus B Minus C Whole Square', url: 'https://www.geeksforgeeks.org/a-plus-b-minus-c-whole-square/', categories: ['mathematics'] },
  { title: 'Get Total Number of Checkboxes on a Page Using Selenium', url: 'https://www.geeksforgeeks.org/how-to-get-the-total-number-of-checkboxes-in-a-page-using-selenium/?itm_source=auth&itm_medium=contributions&itm_campaign=articles', categories: ['web-development', 'linux-tools'] },
  { title: 'Cos A Plus B', url: 'https://www.geeksforgeeks.org/cos-a-plus-b/', categories: ['mathematics'] },
  { title: 'Addition Property of Equality', url: 'https://www.geeksforgeeks.org/addition-property-of-equality/', categories: ['mathematics'] },
  { title: 'Sudoku in C', url: 'https://www.geeksforgeeks.org/sudoku-in-c/', categories: ['programming'] },
];
const categoryLabels = {
  programming: 'Programming',
  'web-development': 'Web Development',
  'linux-tools': 'Linux & Tools',
  mathematics: 'Mathematics',
  science: 'Science',
  'education-experiences': 'Education & Experiences',
  'data-analysis': 'Data Analysis',
};
let activeArticleFilter = 'all';
let showAllArticles = false;

function createArticleCard(article) {
  const card = document.createElement('article');
  card.className = 'article-card';

  const categories = document.createElement('p');
  categories.className = 'project-type';
  categories.textContent = article.categories.map((category) => categoryLabels[category]).join(' · ');

  const heading = document.createElement('h3');
  const link = document.createElement('a');
  link.href = article.url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = article.title;
  heading.append(link);

  card.append(categories, heading);
  return card;
}

function updateArticles() {
  const query = articleSearch.value.trim().toLowerCase();
  const matchingArticles = articles.filter((article) => {
    const matchesCategory = activeArticleFilter === 'all' || article.categories.includes(activeArticleFilter);
    const searchableText = `${article.title} ${article.categories.map((category) => categoryLabels[category]).join(' ')}`.toLowerCase();
    return matchesCategory && searchableText.includes(query);
  });
  const visibleArticles = showAllArticles ? matchingArticles : matchingArticles.slice(0, 8);

  articleList.replaceChildren(...visibleArticles.map(createArticleCard));
  articleEmpty.hidden = matchingArticles.length !== 0;
  showMoreButton.hidden = matchingArticles.length <= 8;
  showMoreButton.setAttribute('aria-expanded', String(showAllArticles));
  showMoreButton.textContent = showAllArticles ? 'Show featured articles' : 'Show all articles';
  articleStatus.textContent = showAllArticles || matchingArticles.length <= 8
    ? `Showing ${visibleArticles.length} of ${matchingArticles.length} articles`
    : `Showing ${visibleArticles.length} featured of ${matchingArticles.length} matching articles`;
}

articleFilterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeArticleFilter = button.dataset.articleFilter;
    articleFilterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle('is-active', isActive);
      filterButton.setAttribute('aria-pressed', String(isActive));
    });
    updateArticles();
  });
});

articleSearch.addEventListener('input', updateArticles);

showMoreButton.addEventListener('click', () => {
  showAllArticles = !showAllArticles;
  updateArticles();
});

updateArticles();

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
const contactFields = [
  { input: document.querySelector('#contact-name'), error: document.querySelector('#name-error'), validate: (field) => field.value.trim().length >= 2, message: 'Please enter at least 2 characters.' },
  { input: document.querySelector('#contact-email'), error: document.querySelector('#email-error'), validate: (field) => field.validity.valid && field.value.trim() !== '', message: 'Enter a valid email address.' },
  { input: document.querySelector('#contact-message'), error: document.querySelector('#message-error'), validate: (field) => field.value.trim().length >= 10, message: 'Please enter at least 10 characters.' },
];

function validateContactField({ input, error, validate, message }) {
  const isValid = validate(input);
  input.setAttribute('aria-invalid', String(!isValid));
  error.textContent = isValid ? '' : message;
  return isValid;
}

contactFields.forEach((field) => {
  field.input.addEventListener('blur', () => validateContactField(field));
  field.input.addEventListener('input', () => {
    if (field.input.hasAttribute('aria-invalid')) validateContactField(field);
  });
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  formStatus.textContent = '';
  const invalidFields = contactFields.filter((field) => !validateContactField(field));

  if (invalidFields.length > 0) {
    invalidFields[0].input.focus();
    formStatus.textContent = 'Please fix the highlighted fields.';
    return;
  }

  const name = contactFields[0].input.value.trim();
  contactForm.reset();
  contactFields.forEach(({ input, error }) => {
    input.removeAttribute('aria-invalid');
    error.textContent = '';
  });
  formStatus.textContent = `Thanks, ${name}. The form is valid. This demo does not send or store messages.`;
});