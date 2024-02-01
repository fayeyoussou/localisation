import {Component} from '@angular/core';
import * as Leaflet from 'leaflet';
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {Icon} from 'leaflet';

Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: 'marker-icon.png',
  iconUrl: 'marker-icon.png',
  // shadowUrl: 'marker-icon.png'
});

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    LeafletModule
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {

  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    ],
    zoom: 22,
    center: {lat: 14.7055071, lng: -17.4802317}
  }

  initMarkers() {
    /**
     * 14.659892333775256 -17.434272766113285
     * 14.762564226140805 -17.45109558105469
     * 14.741967269666334 -17.522850036621097
     *  14.748279447375536 -17.412300109863285
     */
    const initialMarkers = [
      {
        position: {lat: 14.659892333775256, lng: -17.434272766113285},
        draggable: false,
        icon: new Icon({
          iconUrl: 'assets/icon.png',
          iconSize: [38, 95], // Adjust size as needed
          iconAnchor: [22, 94], // Adjust anchor point as needed
        })
      },
      {
        position: {lat: 14.762564226140805, lng: -17.45109558105469},
        draggable: false
      },
      {
        position: {lat: 14.741967269666334, lng: -17.522850036621097},
        draggable: false,
      }
    ];
    for (let index = 0; index < initialMarkers.length; index++) {
      const data = initialMarkers[index];
      const marker = this.generateMarker(data, this.markers.length);
      marker.addTo(this.map).bindPopup(`<b>${data.position.lat},  ${data.position.lng}</b>`);
      this.map.panTo(data.position);
      this.markers.push(marker)
    }
  }

  generateMarker(data: any, index: number,url = '../assets/icon.png') {
    return Leaflet.marker(data.position, {draggable: data.draggable,icon : Leaflet.icon({
        iconUrl: url,
        iconSize: [38, 50],
      })},)
      .on('click', (event) => this.markerClicked(event, index))
      .on('dragend', (event) => this.markerDragEnd(event, index));
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    this.initMarkers();
  }

  addMarker(long: number, lat: number, imageUrl: string) {


      const data = {
        position: {lat: lat, lng: long},
        draggable: false,
        icon: new Icon({
          iconUrl: '../assets/icon.png',
          iconSize: [38, 95], // Adjust size as needed
          iconAnchor: [22, 94], // Adjust anchor point as needed
        })
      };
      const marker = this.generateMarker(data, this.markers.length);
      marker.addTo(this.map).bindPopup(`<b>${data.position.lat},  ${data.position.lng}</b>`);
      this.map.panTo(data.position,{
        animate : true,
        duration : 2
      });
      this.markers.push(marker)

  }

  mapClicked($event: any) {
    console.log($event.latlng.lat, $event.latlng.lng);
    this.addMarker($event.latlng.lng, $event.latlng.lat, "")

  }

  generateRandomPoint(): [number, number] {
    const minLat = 14.659892333775256;
    const maxLat = 14.762564226140805;
    const minLon = -17.522850036621097;
    const maxLon = -17.412300109863285;

    const randomLat = Math.random() * (maxLat - minLat) + minLat;
    const randomLon = Math.random() * (maxLon - minLon) + minLon;

    return [randomLat, randomLon];
  }

  markerClicked($event: any, index: number) {
    //console.log($event.latlng.lat, $event.latlng.lng);
    // let points = this.generateRandomPoint();
    this.initMarkers();

    // this.addMarker($event.latlng.lng, $event.latlng.lat, "")
  }

  markerDragEnd($event: any, index: number) {
    console.log($event.target.getLatLng());
  }
}
