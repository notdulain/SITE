import config from '../../config.json';

const TERMINAL_USERNAME_KEY = 'terminal-username';

export const sanitizeUsername = (value: string) => {
  return value.trim().replace(/\s+/g, ' ').slice(0, 24);
};

export const getDefaultUsername = () => config.ps1_username;

export const getStoredUsername = () => {
  if (typeof window === 'undefined') {
    return getDefaultUsername();
  }

  try {
    const storedUsername = window.localStorage.getItem(TERMINAL_USERNAME_KEY);
    const sanitizedUsername = sanitizeUsername(storedUsername || '');

    return sanitizedUsername || getDefaultUsername();
  } catch {
    return getDefaultUsername();
  }
};

export const hasStoredUsername = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    return sanitizeUsername(
      window.localStorage.getItem(TERMINAL_USERNAME_KEY) || '',
    ).length > 0;
  } catch {
    return false;
  }
};

export const saveUsername = (value: string) => {
  if (typeof window === 'undefined') {
    return '';
  }

  const sanitizedUsername = sanitizeUsername(value);

  if (!sanitizedUsername) {
    return '';
  }

  try {
    window.localStorage.setItem(TERMINAL_USERNAME_KEY, sanitizedUsername);
    return sanitizedUsername;
  } catch {
    return '';
  }
};
