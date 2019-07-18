import { MoviesService } from './../services/movies.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-cards',
  templateUrl: './movie-cards.component.html',
  styleUrls: ['./movie-cards.component.css']
})
export class MovieCardsComponent implements OnInit {

  private moviesData: any;
  private pageID: number = 1;

  constructor(private service: MoviesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params =>{
      this.pageID = +params.get('page');
    });

    this.service.getPosts(20, this.pageID).subscribe(response => {
      this.moviesData = response["data"]["movies"];
    },
      error => {
        console.log(error);
      });
  }

}
