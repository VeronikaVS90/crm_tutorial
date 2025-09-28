import { action, makeObservable, observable } from "mobx";
import type { IUser } from "../../types/auth";

class AuthStore {
  user: IUser = {
    createdAt: "",
    email: "",
    id: "",
    updatedAt: "",
    username: "",
  };

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
      createdAt: "",
      email: "",
      id: "",
      updatedAt: "",
      username: "",
    };
    this.isLoggedIn = false;
  }
}

export const authStore = new AuthStore();
