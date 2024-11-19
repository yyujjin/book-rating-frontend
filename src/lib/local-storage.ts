import { LoginResponse } from "./types";

class LocalStorageService {
  private static usernameKey = "username";
  private static userId = "userId";

  static setUsername(username: string): void {
    localStorage.setItem(this.usernameKey, username);
  }

  static getUsername(): string | null {
    return localStorage.getItem(this.usernameKey);
  }

  static getUserId(): number | null {
    const id = localStorage.getItem(this.userId);
    return id ? +id : null;
  }

  // Remove a value from localStorage
  static removeUserId(): void {
    localStorage.removeItem(this.userId);
  }

  static removeUsername(): void {
    localStorage.removeItem(this.usernameKey);
  }

  // Clear all related keys (optional helper method)
  static clear(): void {
    this.removeUserId();
    this.removeUsername();
  }

  static setAuth({ user }: LoginResponse): void {
    localStorage.setItem(this.usernameKey, user.username);
    localStorage.setItem(this.userId, user.id.toString());
  }
}

export default LocalStorageService;
