import { defineStore } from 'pinia';

interface State {
  user: any;
  loggedIn: boolean;
}

export const useMainStore = defineStore('mainstore', {
  // convert to a function
  state: (): State => ({
    user: null,
    loggedIn: false,
  }),

  actions: {
    setUser(userData: any) {
      this.user = userData;
      this.loggedIn = true;
    },
    clearUser() {
      this.user = null;
      this.loggedIn = false;
    },
  },
});
