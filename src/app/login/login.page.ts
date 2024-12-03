import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formularioLogin: FormGroup;
  constructor(public fb: FormBuilder, public alertController: AlertController, public navCtrl: NavController,  private authService: AuthService) {

    this.formularioLogin = this.fb.group({
      nombre: new FormControl('', Validators.required),
      contraseña: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    console.log();
  }

  

  async ingresar() {
    var f = this.formularioLogin.value;
    
    // const usuarioString = localStorage.getItem('usuario');
    // const usuario = usuarioString ? JSON.parse(usuarioString) : null;

    const usuarioString = localStorage.getItem('usuario');
    const usuario = usuarioString ? JSON.parse(usuarioString) : null;

    // Verificar si los datos coinciden
    if (usuario && f.nombre === usuario.nombre && f.contraseña === usuario.contraseña) {
      // Redirigir o realizar acción si los datos son correctos
      console.log('Ingreso correcto');
      localStorage.setItem('ingresado','true');
      this.navCtrl.navigateRoot('/home');
      // Aquí puedes agregar la lógica para navegar o continuar
    } else {
      // Mostrar alerta si los datos son incorrectos
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        mode: 'ios',
        header: 'Datos Incorrectos',
        message: 'Datos ingresados incorrectos',
        buttons: ['Aceptar'],
      });

      await alert.present();
  }
}

// showOrHidePassword(){
//   this.hide = !this.hide;

//   if (this.hide) this.type = 'contraseña';
//   else this.type = 'text';
// }
}