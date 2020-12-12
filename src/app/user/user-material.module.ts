import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatLineModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';

const materialModules = [
  MatStepperModule,
  MatRadioModule,
  MatDatepickerModule,
  MatSelectModule,
  MatDividerModule,
  MatAutocompleteModule,
  MatNativeDateModule,
  MatLineModule,
];

@NgModule({
  declarations: [],
  imports: [materialModules],
  exports: [materialModules],
})
export class UserMaterialModule {}
