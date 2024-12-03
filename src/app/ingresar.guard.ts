import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { NavController } from '@ionic/angular';  // Usamos NavController de Ionic

export const ingresarGuard: CanActivateFn = (route, state) => {
  const navCtrl = inject(NavController);  // Inyectamos NavController

  if (localStorage.getItem('ingresado')) {
    return true;  // Si está autenticado, permite el acceso
  } else {
    navCtrl.navigateRoot('/login');  // Redirige a la página de login
    return false;
  }
  return false;
};