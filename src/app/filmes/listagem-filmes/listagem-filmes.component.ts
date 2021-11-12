import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { MoviesService } from 'src/app/core/movies.service';
import { ConfigParams } from 'src/app/shared/models/config-params';
import { Movie } from 'src/app/shared/models/movie';
import { NameValue } from 'src/app/shared/models/name-value';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  params: ConfigParams = {
    page: 0,
    numberOfRegisters: 8,    
    fullTextSearch: "",
    field: {} as NameValue
  }
  
  readonly noPhotoMovies = "https://st2.depositphotos.com/4267231/6843/v/950/depositphotos_68437047-stock-illustration-no-image-available.jpg";
  movies: Movie[] = [];
  filter: FormGroup;
  genreOptions: Array<string>;  

  constructor(
    public movieService: MoviesService,
    public fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.filter = this.fb.group({
      fullTextSearch:[],
      genre:[]
    });

    this.filter.get('fullTextSearch').valueChanges.pipe(debounceTime(400)).subscribe((val:string) => {
      this.params.fullTextSearch = val;
      this.resetList()
    });

    this.filter.get('genre').valueChanges.subscribe((val:string) => {      
      this.params.field = { name: 'gender', value: val};
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
    this.params.page++;
    this.movieService.get(this.params).subscribe((movies:Movie[]) => {     
      this.movies.push(...movies)
    });
  }

  resetList() {
    this.params.page = 0;
    this.movies = [];
    this.listMovies();
  }

  open() {
  
  }

}
