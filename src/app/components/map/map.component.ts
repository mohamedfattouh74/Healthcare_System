import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  standalone: true,
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent {
  ngOnInit() {
    this.initializeMap();
  }

  initializeMap() {
    const baseMapURl = 'https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
    let map = L.map('map').setView([30.008355, 31.493451], 13);
    let leafletMarker = L.icon({
      iconUrl: 'assets/hospital-icon.svg',
      iconSize: [38, 95],
      shadowSize: [50, 64],
      iconAnchor: [22, 94],
      shadowAnchor: [4, 62],
      popupAnchor: [-3, -76],
    });
    L.tileLayer(baseMapURl).addTo(map);
    L.marker([30.008355, 31.493451], { icon: leafletMarker })
      .addTo(map)
      .bindPopup('90 St North, New Cairo 1, Cairo Governorate');
  }
}
