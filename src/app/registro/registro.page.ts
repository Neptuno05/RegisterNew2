import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms'
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup;
  constructor( public fb: FormBuilder, public alertController: AlertController, public navCtrl : NavController, private  toastCtrl: ToastController, 
    private loadingCtrl: LoadingController) { 
    this.formularioRegistro =  this.fb.group({
      'nombre': new FormControl("",Validators.required),
      'contraseña': new FormControl("",Validators.required),
      'repetirContraseña': new FormControl("",Validators.required),
    });
  }

  ngOnInit() {
    console.log();
  }

  async guardar(){
    var f= this.formularioRegistro.value;

    if(this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        mode: 'ios',
        header: 'Datos Incompletos',
        message: 'Debe llenar todos los datos requeridos',
        buttons: ['Aceptar']
      });

      await alert.present();
      return;
      
    }

    var usuario = {
      nombre: f.nombre,
      contraseña: f.contraseña,
      // repetirContraseña:f.repetirContraseña
    }

    localStorage.setItem('usuario', JSON.stringify(usuario));

    localStorage.setItem('ingresado','true');
    this.navCtrl.navigateRoot('/login');
  }

}
