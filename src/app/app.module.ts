import { NgModule,InjectionToken,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
/** angular material */
import { AngularMaterialModule } from './shared/angular-material.module';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WebcamModule } from 'ngx-webcam';

import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ImgPipe } from './pipe/img.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { UsuarioDetalleComponent } from './pages/usuario-detalle/usuario-detalle.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    ImgPipe,
    NavbarComponent,
    UsuariosComponent,
    UsuarioDetalleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,
    WebcamModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    NgSelectModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
