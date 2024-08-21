import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FilterPipe } from './filter.pipe';
import { ModalSuccessComponent } from './modal-success/modal-success.component';
import { RechazoModalComponent } from './rechazo-modal/rechazo-modal.component'; // Importa el componente del modal

import { FormsModule } from '@angular/forms';

import { ActaConstitutivaModalComponent } from './acta-constitutiva-modal/acta-constitutiva-modal.component';
import { Afil01ModalComponent } from './afil01-modal/afil01-modal.component';
import { AutorizacionStpsModalComponent } from './autorizacion-stps-modal/autorizacion-stps-modal.component';
import { ComprobanteDomicilioModalComponent } from './comprobante-domicilio-modal/comprobante-domicilio-modal.component';
import { ContratoModalComponent } from './contrato-modal/contrato-modal.component';
import { RfcModalComponent } from './rfc-modal/rfc-modal.component';
import { ReviewInfoModalComponent } from './review-info-modal/review-info-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    ModalSuccessComponent,
    RechazoModalComponent, // Declara el componente del modal
    ActaConstitutivaModalComponent,
    Afil01ModalComponent,
    AutorizacionStpsModalComponent,
    ComprobanteDomicilioModalComponent,
    ContratoModalComponent,
    RfcModalComponent,
    ReviewInfoModalComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
