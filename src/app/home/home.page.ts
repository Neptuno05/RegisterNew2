import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage  implements OnInit{
  username:string ='';



  constructor(private authService: AuthService) {
    // this.username = this.authService.getUser(); // Obtener el nombre de usuario
  }

  ngOnInit() {
    const userData = localStorage.getItem('usuario');
    
    // Asegurarte de que los datos existen y son válidos
    if (userData) {
      const usuario = JSON.parse(userData); // Convertir el JSON a objeto
      this.username = usuario.nombre; // Asignar el nombre del objeto
    } else {
      this.username = 'Invitado'; // Si no hay datos, mostrar un valor por defecto
    }
  }

  onLogout() {
    this.authService.logout(); // Cerrar sesión y redirigir al login
  }
}
