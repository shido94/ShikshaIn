import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-display-data',
  templateUrl: './display-data.component.html',
  styleUrls: ['./display-data.component.css']
})
export class DisplayDataComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function () {
      // console.log('reaches');
    });
  }

}
