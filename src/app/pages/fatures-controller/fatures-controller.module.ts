import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FaturesControllerPageRoutingModule } from './fatures-controller-routing.module';

import { FaturesControllerPage } from './fatures-controller.page';
import { LoadingRedirectComponent } from 'src/app/shared/components/loading-redirect/loading-redirect.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FaturesControllerPageRoutingModule
  ],
  declarations: [FaturesControllerPage, LoadingRedirectComponent]
})
export class FaturesControllerPageModule { }
