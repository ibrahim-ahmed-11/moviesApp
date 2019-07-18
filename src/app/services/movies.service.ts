import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private postsURL = 'https://yts.lt/api/v2/list_movies.json';

  constructor(private http: HttpClient) { }

  getPosts(limit: number, pageNumber: number) {
    return this.http.get(this.postsURL + '?limit=' + limit + '&page=' + pageNumber);
  }

}
