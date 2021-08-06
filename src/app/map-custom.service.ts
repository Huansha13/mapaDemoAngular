import { Injectable } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';
import {environment} from "../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class MapCustomService {

  mapbox = (mapboxgl as typeof mapboxgl);
  map: any;
  style = 'mapbox://styles/mapbox/light-v10';
  lat = -9.409397973389481;
  lng = -74.92544261935268;
  zoom = 5;

  constructor() {
    this.map = mapboxgl.Map;
    this.mapbox.accessToken = environment.mapboxToken;
  }

  buildMap(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      try {
        this.map = new mapboxgl.Map( {
          container: 'map',
          style: this.style,
          zoom: this.zoom,
          center:  [this.lng, this.lat]
        });
        this.marker();
        resolve({
          map: this.map
        })
      } catch (e){
        reject(e)
      }
    });
  }
  marker(): void {
    this.map.on('load', () => {
      this.map.loadImage('https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png', (error: Error, image: HTMLImageElement) => {
          if(error) { throw  error}
          this.map.addImage('custom-marker', image);

          this.map.addSource('points', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [ -76.97401504522394, -11.927504203409868]
                  },
                  properties: {
                    title: 'Lima'
                  }
                },
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [  -75.74354641851139, -11.335667708593371]
                  },
                  properties: {
                    title: 'Tarma'
                  }
                },
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [  -77.47337906339969, -9.575205892952532]
                  },
                  properties: {
                    title: 'Huaraz'
                  }
                },
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [ -78.48664193557907 ,  -7.159586570023454]
                  },
                  properties: {
                    title: 'Cajamarca'
                  }
                },
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [ -74.3046205504652, -13.017216810925712]
                  },
                  properties: {
                    title: 'Ayacucho'
                  }
                }
              ]
            }
          });

          this.map.addLayer({
            id: 'points',
            type: 'symbol',
            source: 'points',
            layout: {
              'icon-image' : 'custom-marker',
              'text-field' : ['get', 'title'],
              'text-font' : [
                'Open Sans Semibold',
                'Arial Unicode MS Bold'
              ],
              'text-offset' : [0, 1.25],
              'text-anchor' : 'top'
            }
          });
        })
    });
  }
}
