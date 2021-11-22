import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { MoviesService } from 'src/app/core/movies.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { Alert } from 'src/app/shared/models/alert';
import { Movie } from 'src/app/shared/models/movie';

@Component({
  selector: 'dio-visualizar-filmes',
  templateUrl: './visualizar-filmes.component.html',
  styleUrls: ['./visualizar-filmes.component.scss']
})
export class VisualizarFilmesComponent implements OnInit {

  readonly noPhotoMovies = "https://st2.depositphotos.com/4267231/6843/v/950/depositphotos_68437047-stock-illustration-no-image-available.jpg";
  movie: Movie;

  constructor(
    private activateRoute: ActivatedRoute,
    private movieService: MoviesService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.visualize(this.activateRoute.snapshot.params['id']);
  }

  visualize(id: number): void {
    this.movieService.getById(id).subscribe((movie: Movie) => this.movie = movie)
  }

  delete(): void {
    const config = {
      data: {
        title: "Are you sure to delete the movie?",
        description: "If you want to continue, please press OK",
        colorBtnSuccess: "warn",
        colorBtnCancel: "accent",
        hasCloseBtn: true
      } as Alert        
    }
    const dialogRef = this.dialog.open(AlertComponent,config);

    dialogRef.afterClosed().subscribe((option: boolean) => {
      if (option) {
        this.movieService.delete(this.movie.id).subscribe(() => this.router.navigateByUrl('filmes'))         
      } 
    });
  }

  edit(): void {
    this.router.navigateByUrl('filmes/cadastro/'+this.movie.id);
  }

}
