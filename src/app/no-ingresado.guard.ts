import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { NavController } from '@ionic/angular';  // Usamos NavController de Ionic

export const noIngresadoGuard: CanActivateFn = (route, state) => {
  const navCtrl = inject(NavController);  // Inyectamos NavController

  if (localStorage.getItem('ingresado')) {
    return true;  // Si no está autenticado, permite el acceso
  } else {
    navCtrl.navigateRoot('/home');  // Redirige a la página de home si está autenticado
    return false;
  }
};