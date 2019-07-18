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
  public loading = false;

  constructor(private service: MoviesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.loading = true;
      this.pageID = +params.get('page');
      this.getPosts();
      this.scrollToTopPage();
    });

  }

  getPosts() {
    this.loading = true;
    this.service.getPosts(20, this.pageID).subscribe(response => {
      this.moviesData = response["data"]["movies"];
      this.loading = false;
    }, error => {
      console.log(error);
      this.loading = false;
    });
  }

  scrollToTopPage() {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 5);
  }

}
