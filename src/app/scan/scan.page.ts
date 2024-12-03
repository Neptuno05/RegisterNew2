import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { AlertController, LoadingController, ModalController, Platform, ToastController } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { LensFacing, BarcodeScanner} from '@capacitor-mlkit/barcode-scanning';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { Clipboard } from '@capacitor/clipboard';
import { Browser } from '@capacitor/browser';



@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit{
  qrResult!: string | null;

  segment = 'scan';
  qrText = '';

  scanResult = 'youtube.com';

  constructor(
    private loadingController: LoadingController,
    private platform : Platform,
    private modalController: ModalController,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    if(this.platform.is('capacitor')){
      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners(); 
    }
  }

// Escanea un qr  y guarda el resultado en la variable 'scanResult'
  async startScan() {
    const modal = await this.modalController.create({
    component: BarcodeScanningModalComponent,
    cssClass: 'barcode-scanning-modal',
    showBackdrop: false,
    componentProps: { 
      formats: [],
      LensFacing: LensFacing.Back
     }
    });
  
    await modal.present();
    
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.scanResult = data?.barcode?.displayValue;
    }

  }
// Lee un qr desde una imagen y guarda el resultado en la variable 'scanResult'
    async readBarcodeFromImage(){
        const {files} = await FilePicker.pickImages();
        const path = files[0]?.path;

        if(!path) return;

       const { barcodes} = await BarcodeScanner.readBarcodesFromImage({
          path,
          formats: [],
        })

        this.scanResult = barcodes[0].displayValue;
    }

  // captura el elemento html , lo convierte a canvas y obtiene una imagen
  captureScreen() {
    const element = document.getElementById('qrImage') as HTMLElement;

    html2canvas(element).then((canvas: HTMLCanvasElement) => {
      this.downloadImage(canvas);
      if(this.platform.is('capacitor')) this.shareImage(canvas);
      else this.downloadImage(canvas);
    });
  }

  // ********* download image (web)****************
  downloadImage(canvas: HTMLCanvasElement) {
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'qr.png';
    link.click();
  }

  // ************** share image (mobile) ****************
  async shareImage(canvas: HTMLCanvasElement) {
    let base64 = canvas.toDataURL();
    let path = 'qr.png';


      const loading = await this.loadingController.create({ spinner: 'crescent'});
      await loading.present();


    await Filesystem.writeFile({
      path,
      data: base64,
      directory: Directory.Cache,
    }).then(async (res) => {
      let uri = res.uri;

      await Share.share({ url: uri });

      await Filesystem.deleteFile({
        path,
        directory: Directory.Cache
      });
    }).finally(() => {
      loading.dismiss();
    })
  }

// Funcion para copiar el resultado del escaneo
  writeToClipboard = async () => {
  await Clipboard.write({
    string: this.scanResult
  });


    const toast = await this.toastController.create({
      message: 'Copiado a porta papeles',
      duration: 2000,
      color: 'tertiary',
      icon: 'clipboard-outline',
      position: 'bottom'
    });
    toast.present();
}



openCapacitorSite = async () => {
    const alert = await this.alertController.create({
      header: 'Notificación',
      message: 'Quieres abrir este enlace en el navegador?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Okay',
          handler: async() => {
            let url = this.scanResult;

            if(!['https://'].includes(this.scanResult)) url ='https://' + this.scanResult;
            
            await Browser.open({ url});
          }
        }
      ]
    });
  
    await alert.present();



};

//Esta funcion chequea si el resultado del escaneo es una url
isUrl(){
  let regex = /\.(com|net|io|me|crypto|ai)\b/i;
  return regex.test(this.scanResult);
}

  // onCodeResult(result: string) {
  //   this.qrResult = result;
  //   // Aquí puedes implementar la lógica para registrar la asistencia
  //   console.log('Código QR escaneado:', result);
  // }
}
