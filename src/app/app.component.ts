import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinct';

import { Component } from '@angular/core';
import {Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Instant Search!';
  searchTerm: string;
  results;
  latestSearch = new Subject<string>();
  constructor(public http: Http) {
  this.results = this.latestSearch
  .debounceTime(500) // wait for 500 ms
  .distinct()        // if same entry put again dont let new request
  .filter(term => !!term) //only filter values that matches - not searching for the empty string
  .switchMap( term => 
        this.http.get('https://api.github.com/search/repositories?q=${term}&sort=created&order=desc')
       .map(res => res.json().items.map(item => item)));

  }

  search(term) {
    this.latestSearch.next(term);
 
  }
  
}
