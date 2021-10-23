import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../../material/material.module";
import { InputTextComponent } from './input-text/input-text.component';
import { InputTextareaComponent } from './input-textarea/input-textarea.component';
import { InputNumberComponent } from './input-number/input-number.component';
import { InputDateComponent } from './input-date/input-date.component';
import { InputSelectComponent } from './input-select/input-select.component';

@NgModule({
    declarations: [
        InputTextComponent,
        InputTextareaComponent,
        InputNumberComponent,
        InputDateComponent,
        InputSelectComponent
        
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule
    ],
    exports: [
        InputTextComponent,
        InputTextareaComponent,
        InputNumberComponent,
        InputDateComponent,
        InputSelectComponent
        
    ]
})

export class FieldsModule { }