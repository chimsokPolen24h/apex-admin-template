/**
 * Theme Management Store
 * Handles dark mode / light mode system with localStorage persistence
 * and system preference detection
 */

const STORAGE_KEY = "app-theme";
const THEMES = {
  LIGHT: "light",
  DARK: "dark",
};

export default {
  data() {
    return {
      currentTheme: THEMES.DARK,
    };
  },

  methods: {
    /**
     * Initialize theme on app startup
     * Priority: localStorage > system preference > default (dark)
     */
    initTheme() {
      const savedTheme = localStorage.getItem(STORAGE_KEY);

      if (savedTheme) {
        this.currentTheme = savedTheme;
      } else if (this.hasSystemPreference()) {
        this.currentTheme = this.getSystemPreference();
      } else {
        this.currentTheme = THEMES.DARK;
      }

      this.applyTheme(this.currentTheme);
    },

    /**
     * Check if system has theme preference
     */
    hasSystemPreference() {
      return (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme)").media !== "not all"
      );
    },

    /**
     * Get system theme preference
     */
    getSystemPreference() {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return THEMES.DARK;
      }
      return THEMES.LIGHT;
    },

    /**
     * Toggle between light and dark themes
     */
    toggleTheme() {
      const newTheme =
        this.currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
      this.setTheme(newTheme);
    },

    /**
     * Set theme explicitly
     */
    setTheme(theme) {
      if (!Object.values(THEMES).includes(theme)) {
        console.warn(`Invalid theme: ${theme}`);
        return;
      }

      this.currentTheme = theme;
      this.applyTheme(theme);
      localStorage.setItem(STORAGE_KEY, theme);
    },

    /**
     * Apply theme to the DOM
     * Adds/removes 'dark' class on html element for Tailwind dark mode
     */
    applyTheme(theme) {
      const htmlElement = document.documentElement;

      if (theme === THEMES.DARK) {
        htmlElement.classList.add("dark");
      } else {
        htmlElement.classList.remove("dark");
      }
    },

    /**
     * Get current theme
     */
    getTheme() {
      return this.currentTheme;
    },

    /**
     * Check if dark mode is active
     */
    isDarkMode() {
      return this.currentTheme === THEMES.DARK;
    },

    /**
     * Check if light mode is active
     */
    isLightMode() {
      return this.currentTheme === THEMES.LIGHT;
    },
  },
};
