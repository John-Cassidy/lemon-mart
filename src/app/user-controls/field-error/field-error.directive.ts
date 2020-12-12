import { Directive } from '@angular/core';

export type ValidationError = 'required' | 'minlength' | 'maxlength' | 'invalid';

export const ErrorSets: { [key: string]: ValidationError[] } = {
  OptionalText: ['minlength', 'maxlength'],
  RequiredText: ['minlength', 'maxlength', 'required'],
};

@Directive({
  selector: '[appFieldError]',
})
export class FieldErrorDirective {
  constructor() {}
}
