var mymap = L.map('map').setView([-43.880833, 169.040278], 13);

L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>tributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style &copy; <a href="https:/ntopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

var markerRiverSafari = L.marker([-43.853582, 169.054602]).addTo(mymap);
markerRiverSafari.bindPopup("<b>Haast River Safari!</b><br>Experience real New Zealand.").openPopup();

var markerStadt = L.marker([-43.880833, 169.040278]).addTo(mymap);
markerStadt.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

// Beim Klicken auf beliebigen Punkt auf der Karte werden entsprechende Koordinaten angezeigt:
var popup = L.popup();
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}
mymap.on('click', onMapClick);



