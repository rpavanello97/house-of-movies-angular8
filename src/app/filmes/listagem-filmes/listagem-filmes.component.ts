import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MoviesService } from 'src/app/core/movies.service';
import { Movie } from 'src/app/shared/models/movie';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  readonly numberOfRegisters = 8;
  page = 0;
  movies: Movie[] = [];
  filter: FormGroup;
  genreFilter: Array<string>;

  constructor(
    public movieService: MoviesService,
    public fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.filter = this.fb.group({
      titleFilter:[],
      genreFilter:[]
    });

    this.genreFilter = [
      "Action",
      "Adventure",
      "Sci-Fi",
      "Romance",
      "Horror"
    ];

    this.listMovies();

  }

  onScroll(): void {
    this.listMovies();
  }

  listMovies(): void {
    debugger
    this.page++;
    this.movieService.get(this.page, this.numberOfRegisters).subscribe((movies:Movie[]) => {     
      this.movies.push(...movies)
    });
  }

  open() {
  
  }

}
