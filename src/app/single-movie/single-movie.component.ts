import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NumberSymbol } from '@angular/common';
import { MoviesService } from '../services/movies.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.css']
})
export class SingleMovieComponent implements OnInit {

  private movieDetails: any;
  private similarMovies: any;
  private movieID: NumberSymbol;
  public loading = false;

  constructor(private service: MoviesService, private route: ActivatedRoute, private titleService: Title) { }

  ngOnInit() {
    this.loading = true;
    this.route.paramMap.subscribe(params => {
      this.loading = true;
      this.movieID = +params.get('id');
      this.getMovieDetails();
    });
  }

  getMovieDetails() {
    this.service.getMovieDetails(this.movieID).subscribe(response => {
      this.movieDetails = response["data"]["movie"];
      this.titleService.setTitle(response["data"]["movie"]["title"]);
      this.getSimilarMovies(parseInt(response["data"]["movie"]["id"]));
    }, error => {
      console.log(error);
      this.loading = false;
    });
  }

  getSimilarMovies(movieID: number) {
    this.service.getSimilarMovies(movieID).subscribe(response => {
      this.similarMovies = response["data"]["movies"];
      this.loading = false;
    }, error => {
      console.log(error);
      this.loading = false;
    });
  }

}
