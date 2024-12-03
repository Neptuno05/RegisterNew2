import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, ModalController } from '@ionic/angular';

import { ScanPageRoutingModule } from './scan-routing.module';

import { ScanPage } from './scan.page';
import { QrCodeModule } from 'ng-qrcode';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScanPageRoutingModule,
    QrCodeModule,
    MatProgressBarModule,
  ],
  declarations: [ScanPage, BarcodeScanningModalComponent]
})
export class ScanPageModule {}
