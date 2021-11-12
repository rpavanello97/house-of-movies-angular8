import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigParams } from '../shared/models/config-params';

@Injectable({
  providedIn: 'root'
})
export class ParamsConfigService {

  constructor( ) { }

  getConfigParams(config: ConfigParams): HttpParams {   
    let httpParams = new HttpParams();
    if (config.page) {
      httpParams = httpParams.set('_page', config.page.toString());
    }
    if (config.numberOfRegisters) {
      httpParams = httpParams.set('_limit', config.numberOfRegisters.toString());
    }     
    if (config.fullTextSearch) {
      httpParams = httpParams.set('q', config.fullTextSearch);
    }
    if (config.field.value && config.field.value != "All") {
      httpParams = httpParams.set(config.field.name, config.field.value.toString());
    }
    httpParams = httpParams.set('_sort', 'id');
    httpParams = httpParams.set('_order', 'desc');
   
    return httpParams;
  }
}
