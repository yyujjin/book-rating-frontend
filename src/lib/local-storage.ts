import { LoginResponse } from "./types";

class LocalStorageService {
  private static accessTokenKey = "accessToken";
  private static usernameKey = "username";
  private static userId = "userId";

  // Set a value in localStorage
  static setAccessToken(token: string): void {
    localStorage.setItem(this.accessTokenKey, token);
  }

  static setUsername(username: string): void {
    localStorage.setItem(this.usernameKey, username);
  }

  // Get a value from localStorage
  static getAccessToken(): string | null {
    if (typeof window === undefined) return null;
    return localStorage.getItem(this.accessTokenKey);
  }

  static getUsername(): string | null {
    return localStorage.getItem(this.usernameKey);
  }

  static getUserId(): number | null {
    const id = localStorage.getItem(this.userId);
    return id ? +id : null;
  }

  // Remove a value from localStorage
  static removeAccessToken(): void {
    localStorage.removeItem(this.accessTokenKey);
  }

  static removeUsername(): void {
    localStorage.removeItem(this.usernameKey);
  }

  // Clear all related keys (optional helper method)
  static clear(): void {
    this.removeAccessToken();
    this.removeUsername();
  }

  static setAuth({ user, accessToken }: LoginResponse): void {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.usernameKey, user.username);
    localStorage.setItem(this.userId, user.id.toString());
  }
}

export default LocalStorageService;
