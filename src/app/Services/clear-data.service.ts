import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ClearDataService {

  constructor(private data:DataService) { }

  resetFilters(){
    this.data.resetFilters=true;
  }

}
