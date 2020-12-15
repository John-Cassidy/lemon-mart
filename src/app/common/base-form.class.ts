import { EventEmitter, Input, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

export abstract class BaseFormComponent<TFormData extends object> {
  @Input() initialData!: TFormData;
  @Input() disable: boolean | undefined;
  @Output() formReady: EventEmitter<AbstractControl>;
  formGroup!: FormGroup;

  private registeredForms: string[] = [];

  constructor() {
    this.formReady = new EventEmitter<AbstractControl>(true);
  }

  abstract buildForm(intialData?: TFormData): FormGroup;

  patchUpdateData(data: object): void {
    this.formGroup.patchValue(data, { onlySelf: false });
  }

  patchUpdatedDataIfChanged(changes: SimpleChanges): void {
    if (this.formGroup && this.hasChanged(changes.initialData)) {
      this.patchUpdateData(this.initialData);
    }
  }

  emaitFormReady(control: AbstractControl | null = null): void {
    this.formReady.emit(control || this.formGroup);
  }

  registerForm(name: string, control: AbstractControl): void {
    this.formGroup.setControl(name, control);
    this.registeredForms.push(name);
  }

  deregisteredForm(name: string): void {
    if (this.formGroup.contains(name)) {
      this.formGroup.removeControl(name);
    }
  }

  protected deregisterAllForms(): void {
    this.registeredForms.forEach((name) => this.deregisteredForm(name));
  }

  hasChanged(change: SimpleChange): boolean {
    return change?.previousValue !== change?.currentValue;
  }
}
