import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private currentUser: string | null = null;

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    // Simulación de autenticación (puedes extender esto con lógica real)
    if (username && password) {
      this.isAuthenticated = true;
      this.currentUser = username;
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.currentUser = null;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getUser(): string | null {
    return this.currentUser;
  }
}