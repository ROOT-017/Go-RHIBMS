export type OnboardingState = {
  completed?: boolean;
  step?: string;
  skipped?: boolean;
};
export const REFS = {
  LANGUAGE: 'medsync-ai-lang',
  LOGIN_ONCE: 'medsyncai-login-once',
};

export const setLanguage = (lang: string) =>
  localStorage.setItem(REFS.LANGUAGE, lang);

export const getLanguage = () => localStorage.getItem(REFS.LANGUAGE);

export const getLoginOnce = (email: string) =>
  localStorage.getItem(REFS.LOGIN_ONCE + email) == 'true';
export const setLoginOnce = (once: boolean, email: string) =>
  localStorage.setItem(REFS.LOGIN_ONCE + email, String(once));
export const clearStorage = () => {};
