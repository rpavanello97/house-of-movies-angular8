import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ValidateErrorsService } from '../validate-fields.service';

@Component({
  selector: 'dio-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss']
})
export class InputNumberComponent {

  @Input() title: string;
  @Input() min = 0;
  @Input() max = 10;
  @Input() step = 1;  
  @Input() formGroup: FormGroup;
  @Input() controlName: string;

  constructor(public validation:ValidateErrorsService) { }

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }
}
