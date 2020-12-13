import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from '../app.material.module';
import { FieldErrorModule } from '../user-controls/field-error/field-error.module';
import { LogoutComponent } from './logout/logout.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { ProfileComponent } from './profile/profile.component';
import { UserMaterialModule } from './user-material.module';
import { UserRoutingModule } from './user-routing.module';
import { ViewUserComponent } from './view-user/view-user.component';

@NgModule({
  declarations: [
    ProfileComponent,
    LogoutComponent,
    NavigationMenuComponent,
    ViewUserComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    UserRoutingModule,
    AppMaterialModule,
    UserMaterialModule,
    FieldErrorModule,
  ],
})
export class UserModule {}
