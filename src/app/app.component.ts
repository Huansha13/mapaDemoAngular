import {Component, OnInit} from '@angular/core';
import {MapCustomService} from "./map-custom.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'demoMapbox';
  constructor( private mapService: MapCustomService) {
  }

  ngOnInit(): void {
    this.mapService.buildMap()
      .then((data) => console.log('*** Good ***', data))
      .catch((err) => console.log('*** ERROR ***', err));
  }
}
