import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-five-star',
  templateUrl: './five-star.component.html',
  styles: []
})
export class FiveStarComponent {

  @Input() rating = 0;

  @Output() onRatingChange =  new EventEmitter<number>();


  setRating(rating: number) {
    this.rating = rating;

    this.onRatingChange.next(99);
  }
}
