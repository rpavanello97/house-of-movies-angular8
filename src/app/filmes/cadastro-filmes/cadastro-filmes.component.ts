import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from 'src/app/core/movies.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { ValidateErrorsService } from 'src/app/shared/components/fields/validate-fields.service';
import { Alert } from 'src/app/shared/models/alert';
import { Movie } from 'src/app/shared/models/movie';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})

export class CadastroFilmesComponent implements OnInit {

  registration: FormGroup;
  gender: Array<string>;
  id: number;

  constructor(private fb: FormBuilder,
    private dialog: MatDialog,
    private activateRoute: ActivatedRoute,
    public validation: ValidateErrorsService,
    public router: Router,
    public movieService: MoviesService
  ) { }

  get f() {
    return this.registration.controls;
  }

  ngOnInit(): void {

    this.id = this.activateRoute.snapshot.params['id'];

    if (this.id) {
      this.movieService.getById(this.id).subscribe((movie: Movie) => {
        this.createForm(movie);
      });
    } else {
      this.createForm(this.generateBlankMovie());
    }

    this.gender = [
      "Action",
      "Adventure",
      "Sci-Fi",
      "Romance",
      "Horror",
      "Drama"
    ];
  }

  submit(): void {
    this.registration.markAllAsTouched();

    if (this.registration.invalid) {
      return
    }

    const movie = this.registration.getRawValue() as Movie;
    if (this.id) {
      movie.id = this.id;
      this.edit(movie);
    } else {
      this.save(movie);
    }

    // alert('Sucesso \n\n' + JSON.stringify(this.registration.value, null, 4));
  }

  returnBtn(): void {
    this.router.navigateByUrl('/filmes/'+this.id);
  }

  restartForm(): void {    
    this.registration.reset();
  }

  private createForm(movie: Movie): void {
    this.registration = this.fb.group({
      title: [movie.title, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      // urlPhoto: ['', [Validators.required, Validators.minLength(10)]],
      urlPhoto: [movie.urlPhoto],
      releaseDate: [movie.releaseDate, [Validators.required]],
      description: [movie.description],
      imbdRate: [movie.imbdRate, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: [movie.urlIMDb, [Validators.required, Validators.minLength(10)]],
      gender: [movie.gender, [Validators.required]],
    });
  }

  private generateBlankMovie(): Movie {
    return {
      id: null,
      title: null,
      urlPhoto: null,
      releaseDate: null,
      description: null,
      imbdRate: null,
      urlIMDb: null,
      gender: null,
    } as Movie
  }

  private save(movie: Movie): void {
    this.movieService.save(movie).subscribe((movie: Movie) => {
      const config = {
        data: {
          title: "SUCCESS",
          description: "Ho yeah, your data has been saved successfully!",
          btnSuccess: "Go to the list",
          btnCancel: "Keep registering",
          colorBtnCancel: "primary",
          hasCloseBtn: true
        } as Alert
      }

      const dialogRef = this.dialog.open(AlertComponent, config);

      dialogRef.afterClosed().subscribe((option: boolean) => {
        if (option) {
          this.router.navigateByUrl('filmes');
        } else {
          this.restartForm();
        }
      });
    }, (err: Error) => {
      const config = {
        data: {
          title: 'Error to register',
          description: 'Oh no!!! Your data has not been saved, please contact yout support.',
          btnSuccess: 'Close',
          colorBtnSuccess: 'warn'
        } as Alert
      }

      this.dialog.open(AlertComponent, config);

    });
  }

  private edit(movie: Movie): void {
    this.movieService.edit(movie).subscribe(() => {
      const config = {
        data: {
          description: 'Your movie has been updated with success.',
          btnSuccess: 'Go to movies'
        } as Alert
      }

      const dialogRef = this.dialog.open(AlertComponent, config);
      dialogRef.afterClosed().subscribe(() => {
        this.router.navigateByUrl('filmes');
      });
    }, (err: Error) => {
      const config = {
        data: {
          title: 'Error to register',
          description: 'Oh no!!! Your data has not been saved, please contact yout support.',
          btnSuccess: 'Close',
          colorBtnSuccess: 'warn'
        } as Alert
      }

      this.dialog.open(AlertComponent, config);

    });
  }
}