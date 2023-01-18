import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Gif, SearchGifResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  // this means that the services is available for the whole application
  providedIn: 'root',
})
export class GifsService {
  // attributes
  private serviceUrl = 'https://api.giphy.com/v1/gifs';
  private apiKey: string = 'uMHrlCfZl9X1GWoKNO2OsSse5lN2cIgk';
  private _historial: string[] = [];

  public gifs: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    if (localStorage.getItem('historial')) {
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    }

    if (localStorage.getItem('gifs')) {
      this.gifs = JSON.parse(localStorage.getItem('gifs')!);
    }
  }

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

    // saving historial to localstorage
    localStorage.setItem('historial', JSON.stringify(this._historial));

    // Params
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    // Searching gifs based on a query
    this.http
      .get<SearchGifResponse>(`${this.serviceUrl}/search?`, { params:params })
      .subscribe((response) => {
        // asing the return value to the gifs var.
        this.gifs = response.data;

        // saving result in the localstorage
        localStorage.setItem('gifs', JSON.stringify(this.gifs));
      });
  }
}
