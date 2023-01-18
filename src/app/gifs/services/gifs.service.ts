import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Gif, SearchGifResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'uMHrlCfZl9X1GWoKNO2OsSse5lN2cIgk';
  private _historial: string[] = [];
  public gifs: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {}

  buscarGifs(query: string) {
    if (this._historial.includes(query)) {
      // Delete duplicates before to insert a new query
      this._historial.forEach((value, index) => {
        if (value == query) this._historial.splice(index, 1);
      });

      // Insert the query into the list
      this._historial.unshift(query);
    } else {
      this._historial.unshift(query);
    }

    // Selecting just the first ten queries
    this._historial = this._historial.splice(0, 10);

    this.http
      .get<SearchGifResponse>(
        `https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=15`
      )
      .subscribe((response) => {
        this.gifs = response.data;
        console.log(this.gifs);
      });
  }
}
