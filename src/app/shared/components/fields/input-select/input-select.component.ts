import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ValidateErrorsService } from '../validate-fields.service';

@Component({
  selector: 'dio-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss']
})
export class InputSelectComponent {

  @Input() title: string;
  @Input() formGroup: FormGroup;
  @Input() controlName: string;
  @Input() options: Array<string>;

  constructor(public validation: ValidateErrorsService) { }

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }

}
