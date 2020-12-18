import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { IConfig, NgxMaskModule } from 'ngx-mask';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMaterialModule } from './app.material.module';
import { AuthHttpInterceptor } from './auth/auth-http.interceptor';
import { authFactory } from './auth/auth.factory';
import { AuthService } from './auth/auth.service';
import { SimpleDialogComponent } from './common/simple-dialog.component';
import { entityConfig } from './entity-metadata';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FieldErrorModule } from './user-controls/field-error/field-error.module';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {
  showMaskTyped: true,
};
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    LoginComponent,
    SimpleDialogComponent,
    NavigationMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FlexLayoutModule,
    FieldErrorModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(options),
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
  ],
  providers: [
    {
      provide: AuthService,
      useFactory: authFactory,
      deps: [AngularFireAuth, HttpClient],
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [SimpleDialogComponent],
})
export class AppModule {}
