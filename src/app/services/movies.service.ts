import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private postsURL = 'https://yts.lt/api/v2/list_movies.json';
  private movieDetailsURL = 'https://yts.lt/api/v2/movie_details.json';
  private similarMoviesURL = 'https://yts.lt/api/v2/movie_suggestions.json';

  constructor(private http: HttpClient) { }

  getPosts(limit: number, pageNumber: number) {
    return this.http.get(this.postsURL + '?limit=' + limit + '&page=' + pageNumber);
  }

  getMovieDetails(movieID: number){
    return this.http.get(this.movieDetailsURL + '?movie_id=' + movieID + '&with_cast=true&with_images=true');
  }

  getSimilarMovies(movieID: number){
    return this.http.get(this.similarMoviesURL + '?movie_id=' + movieID);
  }

}
