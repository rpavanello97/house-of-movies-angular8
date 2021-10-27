import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MoviesService } from 'src/app/core/movies.service';
import { ValidateErrorsService } from 'src/app/shared/components/fields/validate-fields.service';
import { Movie } from 'src/app/shared/models/movie';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})

export class CadastroFilmesComponent implements OnInit {

  registration: FormGroup;
  gender: Array<string>;

  constructor(private fb: FormBuilder, 
              public validation: ValidateErrorsService,
              private movieService: MoviesService
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
      imbdRate: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlImdb: ['', [Validators.required, Validators.minLength(10)]],
      genre: ['', [Validators.required]],
    });
    
    this.gender = [
      "Action",
      "Adventure",
      "Sci-Fi",
      "Romance",
      "Horror"
    ];
  } 

  submit(): void {
    this.registration.markAllAsTouched();

    if (this.registration.invalid) {
      return
    }
    
    const movie = this.registration.getRawValue() as Movie;
    this.save(movie);
    // alert('Sucesso \n\n' + JSON.stringify(this.registration.value, null, 4));
  }

  restartForm(): void {
    this.registration.reset();
  }

  private save(movie: Movie): void {
    this.movieService.save(movie).subscribe((movie: Movie) => {
      alert('Success \n' +"MovieId: "+movie.id);      
      this.registration.reset();
    }), (err: Error) => {
      console.error('Observer got an error: ' + err)  
    }
  }

}