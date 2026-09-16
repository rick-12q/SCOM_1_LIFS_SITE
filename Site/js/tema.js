const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-toggle-icon');

function getInitialTheme() {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }

  return 'dark';
}

function updateThemeButton(theme) {
  if (!themeToggle || !themeIcon) {
    return;
  }

  if (theme === 'dark') {
    themeIcon.textContent = '☀️';
    themeToggle.setAttribute('aria-label', 'Ativar tema claro');
    themeToggle.setAttribute('title', 'Ativar tema claro');
  } else {
    themeIcon.textContent = '🌙';
    themeToggle.setAttribute('aria-label', 'Ativar tema escuro');
    themeToggle.setAttribute('title', 'Ativar tema escuro');
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeButton(theme);
}

const initialTheme = getInitialTheme();
applyTheme(initialTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });
}