import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../shared/models/movie';

const url = "http://localhost:3000/movies/"

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  save(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(url, movie)
  }

  get(page: number, numberOfRegisters: number, fullTextSearch:string, genre:string): Observable<Movie[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('_page', page.toString());
    httpParams = httpParams.set('_limit', numberOfRegisters.toString());
    httpParams = httpParams.set('_sort', 'id');
    httpParams = httpParams.set('_order', 'desc');    
    if (fullTextSearch) {
      httpParams = httpParams.set('q', fullTextSearch);
    }
    if (genre && genre != "All") {
      httpParams = httpParams.set('gender', genre);
    }

    return this.http.get<Movie[]>(url, {params: httpParams});
  }

}
