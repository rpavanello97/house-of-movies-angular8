import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidateErrorsService } from 'src/app/shared/components/fields/validate-fields.service';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})

export class CadastroFilmesComponent implements OnInit {

  registration: FormGroup;

  constructor(private fb: FormBuilder, 
              public validation: ValidateErrorsService
              ) { }

  get f() {
    return this.registration.controls;
  }

  ngOnInit(): void {

    this.registration = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlPhoto: ['', [Validators.required, Validators.minLength(10)]],
      dtRelease: ['', [Validators.required]],
      description: [''],
      imbdRate: [0, [Validators.required, Validators.minLength(0), Validators.max(10)]],
      urlImdb: ['', [Validators.required, Validators.minLength(10)]],
      genre: ['', [Validators.required]],
    });
  }

  save(): void {
    this.registration.markAllAsTouched();

    if (this.registration.invalid) {
      return
    }
    alert('Sucesso \n\n' + JSON.stringify(this.registration.value, null, 4));
  }

  restartForm(): void {
    this.registration.reset();
  }

}