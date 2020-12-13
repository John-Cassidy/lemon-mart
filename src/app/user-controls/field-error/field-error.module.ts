import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FieldErrorDirective } from './field-error.directive';

@NgModule({
  declarations: [FieldErrorDirective],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [FieldErrorDirective],
})
export class FieldErrorModule {}
