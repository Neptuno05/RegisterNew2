import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { noIngresadoGuard } from './no-ingresado.guard';
import { ingresarGuard } from './ingresar.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'forgot-password',
    redirectTo: 'forgot-password',
    pathMatch: 'full'
  },
  {
    path: 'registro',
    redirectTo: 'registro',
    pathMatch: 'full'
  },
  {
    path: 'scan',
    redirectTo: 'scan',
    pathMatch: 'full'
  },
  {
    path: 'login',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'maps',
    redirectTo: 'maps',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'e404',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
    // canActivate: [noIngresadoGuard]  // Solo para no autenticados
 
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule),
    // canActivate: [noIngresadoGuard]  // Solo para no autenticados

  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [ingresarGuard]  // Solo para autenticados


  },
  {
    path: 'scan',
    loadChildren: () => import('./scan/scan.module').then(m => m.ScanPageModule),
    canActivate: [ingresarGuard]  // Solo para autenticados

  },

  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule),
    // canActivate: [noIngresadoGuard]  // Solo para no autenticados

  },
  {
    path: 'e404',
    loadChildren: () => import('./e404/e404.module').then( m => m.E404PageModule)
  },
  {
    path: 'maps',
    loadChildren: () => import('./maps/maps.module').then( m => m.MapsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
