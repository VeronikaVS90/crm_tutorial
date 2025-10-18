import { action, makeObservable, observable } from "mobx";
import type { IUser } from "../../types/auth";

const defaultUser: IUser = {
  createdAt: "",
  email: "",
  id: "",
  updatedAt: "",
  username: "",
};

class AuthStore {
  user = defaultUser;

  isLoggedIn = false;

  constructor() {
    makeObservable(this, {
      user: observable,
      isLoggedIn: observable,
      login: action,
      logout: action,
    });
  }

  login(user: IUser) {
    this.user = user;
    this.isLoggedIn = true;
  }

  logout() {
    this.user = {
      ...defaultUser,
    };
    this.isLoggedIn = false;
  }
}

export const authStore = new AuthStore();
