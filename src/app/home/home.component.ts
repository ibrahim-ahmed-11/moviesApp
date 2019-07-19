import { MoviesService } from './../services/movies.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private currentMoviesData: any;
  private upComingMoviesData: any;

  constructor(private service: MoviesService) { }

  public loading = false;

  ngOnInit() {
    this.loading = true;
    this.service.getPosts(4, 1).subscribe(response => {
      this.currentMoviesData = response["data"]["movies"];
      this.loading = false;
    },
      error => {
        console.log(error);
        this.loading = false;
      });
  }

}
