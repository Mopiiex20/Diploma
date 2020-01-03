import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadderComponent } from './components/headder/headder.component';
import { PopUp } from './components/admin/admin.component'
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
import { AdminGuardService } from './services/admin-guard.service';

import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { BegginTestComponent } from './components/beggin-test/beggin-test.component';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { CountdownModule } from 'ngx-countdown';
import { UsersComponent } from './components/users/users.component';
import { PassedTestComponent } from './components/passed-test/passed-test.component';
import { MathJaxModule } from 'ngx-mathjax';
import { TestDetails } from './components/test-details/test-details.component';

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
    UsersComponent,
    TestDetails,
    BegginTestComponent,
    PassedTestComponent,
    PopUp,
    AdminComponent
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    CountdownModule,
    MathJaxModule.forRoot({
      version: '2.7.5',
      config: 'TeX-AMS_HTML',
      hostname: 'cdnjs.cloudflare.com',
    }),
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
  entryComponents: [PopUp],
  providers: [
    UserService,
    JwtHelperService,
    LoginService,
    AuthService,
    AuthGuardService,
    AdminGuardService,
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
