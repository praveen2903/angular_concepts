import {Component,OnInit} from '@angular/core';
import {Subject, debounceTime, distinctUntilChanged, switchMap} from 'rxjs';
import { AutoComplete } from '../../services/auto-complete';

@Component({
  selector: 'app-search-autocomplete',
  standalone: false,
  templateUrl: './search-autocomplete.html',
  styleUrl: './search-autocomplete.css',
})
export class SearchAutocomplete {
  search$ = new Subject<string>();
  users: any[] = [];

  loading = false;

  constructor(
    private autoCompleteService: AutoComplete
  ) {}

  ngOnInit() {
    this.search$.pipe(debounceTime(500),distinctUntilChanged(), switchMap(value => {
          this.loading = true;
          return this.autoCompleteService.searchUsers(value);
        })).subscribe(res => {
        this.users = res;
        this.loading = false;
      });
  }

  search(value: string) {
    this.search$.next(value);
  }
}
