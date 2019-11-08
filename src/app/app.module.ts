import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadderComponent } from './components/headder/headder.component';
import { CartPopUp } from './components/admin/admin.component'
import { ContentComponent } from './components/content/content.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { RegisterComponent } from './components/register/register.component';
import { HighlightDirective } from './components/headder/headder.directive';
import { CustomHttpInterceptorService } from './services/interceptor';
import AuthService from './services/auth.service';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginService } from './services/common.servise';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { UserService } from './services/users.service';
import { AuthGuardService } from './services/auth-guard-service';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';

export function tokenGetter() {

  return localStorage.getItem("token");

}


@NgModule({
  declarations: [
    HighlightDirective,
    AppComponent,
    HeadderComponent,
    ContentComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    CartPopUp,
    AdminComponent
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['192.168.1.58:3500'],
        blacklistedRoutes: [
          "192.168.1.58:3500/login",
          "192.168.1.58:3500/tests"

        ]
      }
    })
  ],
  entryComponents: [CartPopUp],
  providers: [
    UserService,
    JwtHelperService,
    LoginService,
    AuthService,
    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptorService, multi: true },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
