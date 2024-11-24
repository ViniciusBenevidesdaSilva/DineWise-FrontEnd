export const useSessionsStorage = () => {
  const set = (key: string, value: string): void => {
    try {
      if (typeof window !== 'undefined') window.sessionStorage.setItem(key, value);
    } catch (e) {
      console.warn('Window not defined', e);
    }
  };

  const get = (key: string) => {
    try {
      if (typeof window !== 'undefined') return window.sessionStorage.getItem(key);
    } catch (e) {
      console.warn('Window not defined', e);
    }
  };

  return { set, get };
};
