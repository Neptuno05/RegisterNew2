import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  username!: string;

  constructor(private router: Router) {}

  onRecoverPassword() {
    // Simular el restablecimiento de la contraseña
    console.log(`Recuperar contraseña para: ${this.username}`);
    this.router.navigate(['/login']); // Redirigir a la página de login
  }
}
