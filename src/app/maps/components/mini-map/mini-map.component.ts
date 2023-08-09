import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

import { Map, Marker } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent implements AfterViewInit {

  @Input()
  public lngLat?: [number, number];

  @ViewChild('map')
  public divMap?: ElementRef;

  public map?: Map;


  ngAfterViewInit() {

    if( !this.divMap ) throw 'El elemento HTML no fue encontrado'

    if( !this.lngLat ) throw "LngLat can´t be null";

    // mapa

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 15, // starting zoom
      interactive: false
    });


    //  marker
    if( !this.map ) return;

    new Marker({
      draggable: false
    })
      .setLngLat( this.lngLat )
      .addTo( this.map )
  }

}
