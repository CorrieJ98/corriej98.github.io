// Dark Mode Toggle
(function() {
  const THEME_KEY = 'theme-preference';
  
  function getThemePreference() {
    // Check localStorage first
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) return stored;
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  }
  
  function setTheme(theme) {
    const body = document.body;
    
    if (theme === 'dark') {
      body.classList.add('dark-mode');
      body.classList.remove('light-mode');
    } else {
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
    }
    
    localStorage.setItem(THEME_KEY, theme);
    updateToggleButton(theme);
  }
  
  function updateToggleButton(theme) {
    const button = document.querySelector('.dark-mode-toggle');
    if (button) {
      button.textContent = theme === 'dark' ? '☀️' : '🌙';
      button.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
  }
  
  function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark-mode');
    setTheme(isDark ? 'light' : 'dark');
  }
  
  // Initialize theme on page load
  document.addEventListener('DOMContentLoaded', function() {
    const preference = getThemePreference();
    setTheme(preference);
    
    const button = document.querySelector('.dark-mode-toggle');
    if (button) {
      button.addEventListener('click', toggleTheme);
    }
  });
  
  // Listen for system theme changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      const stored = localStorage.getItem(THEME_KEY);
      if (!stored) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
})();
