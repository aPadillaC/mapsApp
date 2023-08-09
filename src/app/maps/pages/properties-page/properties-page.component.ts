import { Component } from '@angular/core';


interface House {
  title: string;
  description: string;
  lngLat: [number, number];
}


@Component({
  templateUrl: './properties-page.component.html',
  styleUrls: ['./properties-page.component.css']
})
export class PropertiesPageComponent {

  public houses: House[] = [
    {
      title: 'Casa residencial, Málaga',
      description: 'Bella propiedad en Puerto de la Torre, Málaga',
      lngLat: [ -4.490209, 36.737772]
    },
    {
      title: 'Casa de Torrequebrada, Málaga',
      description: 'Hermosa casa de playa en Torrequebrada, Benamádena',
      lngLat: [ -4.54309, 36.57994]
    },
    {
      title: 'Apartamento, La Caleta',
      description: 'Magnífico apartamento en el corazón de La Caleta, Cádiz',
      lngLat: [ -6.305060, 36.529592 ]
    },
    {
      title: 'Local comercial, Gibraltar',
      description: 'Local comercial disponible en Gibraltar, UK, cerca del Ayuntamiento.',
      lngLat: [ -5.35405, 36.14145 ]
    },
  ]

}
