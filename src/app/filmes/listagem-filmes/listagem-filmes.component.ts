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
  genreOptions: Array<string>;

  genre: string;
  fullTextSearch: string;

  constructor(
    public movieService: MoviesService,
    public fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.filter = this.fb.group({
      fullTextSearch:[],
      genre:[]
    });

    this.filter.get('fullTextSearch').valueChanges.subscribe((val:string) => {
      this.fullTextSearch = val;
      this.resetList()
    });

    this.filter.get('genre').valueChanges.subscribe((val:string) => {
      this.genre = val;
      this.resetList()
    });

    this.genreOptions = [
      "All",
      "Action",
      "Adventure",
      "Sci-Fi",
      "Romance",
      "Horror",
      "Drama"
    ];

    this.listMovies();

  }

  onScroll(): void {
    this.listMovies();
  }

  listMovies(): void {
    this.page++;
    this.movieService.get(this.page, this.numberOfRegisters, this.fullTextSearch, this.genre).subscribe((movies:Movie[]) => {     
      this.movies.push(...movies)
    });
  }

  resetList() {
    this.page = 0;
    this.movies = [];
    this.listMovies();
  }

  open() {
  
  }

}
