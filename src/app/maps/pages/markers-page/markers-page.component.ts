import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

import { LngLat, Map, Marker } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"


interface MarkerAndColor {
  color: string,
  marker: Marker
}


interface PlainMarker {
  color: string,
  lngLat: number[]
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent implements AfterViewInit {

  @ViewChild('map')
  public divMap?: ElementRef;

  public markers: MarkerAndColor[] = [];

  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-4.42626, 36.725);


  ngAfterViewInit(): void {

    if( !this.divMap ) throw 'El elemento HTML no fue encontrado'


    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: 13, // starting zoom
    });


    this.readFromLocalStorage();

    // Si queremos personalizar el marcador
    // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML = 'Antonio Padilla';

    // const marker = new Marker({
    //   color: 'red',
    //   element: markerHtml
    // })
    //   .setLngLat(this.currentLngLat)
    //   .addTo( this.map );
  }


  createMarker() {

    if( !this.map ) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lgnLat = this.map.getCenter();


    this.addMarker( lgnLat, color );
  }


  addMarker( lgnLat: LngLat, color: string) {

    if( !this.map ) return;

    const marker = new Marker({
      color: color,
      draggable: true
    })
      .setLngLat( lgnLat )
      .addTo( this.map )

    this.markers.push({
      color: color,
      marker: marker
    });

    this.saveToLocalStorage();

    marker.on('dragend', () => this.saveToLocalStorage());
  }


  deleteMarker( index: number ){

    this.markers[index].marker.remove();
    this.markers.splice( index, 1);

    this.saveToLocalStorage();
  }


  flyTo( marker: Marker ) {

    this.map?.flyTo({
      zoom: 16,
      center: marker.getLngLat()
    });
  }


  saveToLocalStorage() {

    const plainMarkers: PlainMarker[] = this.markers.map( ({ color, marker }) => {

      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    });

    console.log('hola', plainMarkers);


    localStorage.setItem('plainMarkers', JSON.stringify( plainMarkers ));

  }


  readFromLocalStorage() {

    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString);  // ! OJO ¡

    plainMarkers.forEach ( ({ color, lngLat }) => {

      const [ lng, lat ] = lngLat;
      const coords  = new LngLat( lng, lat );

      this.addMarker( coords, color );
    })
  }
}
