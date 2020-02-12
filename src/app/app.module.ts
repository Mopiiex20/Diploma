import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { CustomHttpInterceptorService } from './services/interceptor';
import AuthService from './services/auth.service';
import { LoginService } from './services/common.servise';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { UserService } from './services/users.service';
import { AuthGuardService } from './services/auth-guard-service';
import { LoginGuardService } from './services/admin-guard.service';
import { LoginComponent } from './components/login/login.component';
import { BegginTestComponent } from './components/beggin-test/beggin-test.component';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { CountdownModule } from 'ngx-countdown';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function tokenGetter() {
  return localStorage.getItem("token");
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BegginTestComponent,
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    CountdownModule,
  ],
  providers: [
    UserService,
    LoginService,
    AuthService,
    AuthGuardService,
    LoginGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptorService, multi: true },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' },
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
