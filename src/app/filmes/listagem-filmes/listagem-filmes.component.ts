import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/core/movies.service';
import { Movie } from 'src/app/shared/models/movie';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

   movies: Movie[];

  constructor(
    public movieService: MoviesService
  ) { }

  ngOnInit() {
    this.movieService.get().subscribe((movies:Movie[]) => {
      debugger
      this.movies = movies;
    });
  }

  open() {
  }

}
