import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styles: []
})
export class StarComponent implements OnInit {

  @Input()
  set selected(value: boolean) {
    if(value) {
      this.fillStar();
    } else {
      this.unfillStar();
    }
  }

  imageUrl = '/assets/images/empty-star.png';

  constructor() {
  }

  ngOnInit() {
  }

  fillStar() {
    this.imageUrl = '/assets/images/filled-star.png';
  }

  unfillStar() {
    this.imageUrl = '/assets/images/empty-star.png';
  }

}
