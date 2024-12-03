import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { E404PageRoutingModule } from './e404-routing.module';

import { E404Page } from './e404.page';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    E404PageRoutingModule,
    MatProgressBarModule
  ],
  declarations: [E404Page]
})
export class E404PageModule {}
