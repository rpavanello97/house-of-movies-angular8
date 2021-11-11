import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ConfigParams } from '../shared/models/config-params';
import { Movie } from '../shared/models/movie';
import { ParamsConfigService } from './params-config.service';

const url = "http://localhost:3000/movies/"

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(
    private http: HttpClient,
    private paramsConfig: ParamsConfigService,
    ) { }

  save(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(url, movie)
  }

  get(config: ConfigParams): Observable<Movie[]> {    
    const httpParams = this.paramsConfig.getConfigParams(config);
    
    return this.http.get<Movie[]>(url, {params: httpParams});
  }

}
