export const localStorageService = {
  set(name: string, value: string): void {
    localStorage.setItem(name, value);
  },

  get(name: string): string {
    return localStorage.getItem(name);
  },

  clear(): void {
    localStorage.clear();
  },
};
