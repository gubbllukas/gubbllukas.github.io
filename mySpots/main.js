let startLayer = L.tileLayer.provider("OpenTopoMap")
let mymap = L.map("map", {
    center: [30, 0],
    zoom: 2,
    layers: [
        startLayer
    ]
});


L.control.layers({
    "OpenTopoMap": startLayer,
    "OpenStreetMap.Mapnik": L.tileLayer.provider("OpenStreetMap.Mapnik"),
    "Esri.WorldImagery": L.tileLayer.provider("Esri.WorldImagery"),
}, 
).addTo(mymap);



//Marker für River Safari und weiteres PopUp dazu:
let markerBiwakWalchenseeNordufer = L.marker([47.590221, 11.374207]).addTo(mymap);
markerBiwakWalchenseeNordufer.bindPopup("<b>Biwak am Walchenseeufer</b><br>Baden,Biwak,Lagerfeuer").openPopup();

let markerBiwakPlansee = L.marker([47.480592, 10.846325]).addTo(mymap);
markerBiwakPlansee.bindPopup("<b>Biwak am Plansee</b><br>Biwak,Wasser").openPopup();

let markerAbendspotPlansee = L.marker([47.482455, 10.850761]).addTo(mymap);
markerAbendspotPlansee.bindPopup("<b>Abendessen am Plansee</b><br>Baden,Sonnenuntergang,Essen,Minze").openPopup();

let markerBiwakBachPlansee = L.marker([47.476612, 10.852672]).addTo(mymap);
markerBiwakBachPlansee.bindPopup("<b>Biwak am Bach Nähe Plansee</b><br>Biwak,Lagerfeuer,Wasser,Sonnenaufgang").openPopup();

let markerBiwakGaisalpsee = L.marker([47.428496, 10.324187]).addTo(mymap);
markerBiwakGaisalpsee.bindPopup("<b>Biwak Gaisalpsee</b><br>Biwak,Wasser,Baden,See,Sonnenuntergang").openPopup();

let markerRubihorn = L.marker([47.424632, 10.314776]).addTo(mymap);
markerRubihorn.bindPopup("<b>Rubihorn</b><br>Sonnenaufgangstour vom Gaisalpsee").openPopup();

let markerRissbachKarwendel = L.marker([47.461670, 11.505990]).addTo(mymap);
markerRissbachKarwendel.bindPopup("<b>KarwendelBiwak</b><br>Biwak,Baden,Wasser,Sonnenuntergang").openPopup();

let markerKlammklettern = L.marker([47.557565, 11.541332]).addTo(mymap);
markerKlammklettern.bindPopup("<b>Krottenbachklamm</b><br>Klammkletterei").openPopup();

let markerBiwakSylvenstein = L.marker([47.568938, 11.494105]).addTo(mymap);
markerBiwakSylvenstein.bindPopup("<b>BiwakSylvenstein</b><br>Biwak,Baden,Wasser,Lagerfeuer").openPopup();

let markerPrinzenbad = L.marker([47.454298, 10.568719]).addTo(mymap);
markerPrinzenbad.bindPopup("<b>Prinzenbad</b><br>Baden,Wasserfall").openPopup();

let markerBiwakBirkental = L.marker([47.533765, 10.797322]).addTo(mymap);
markerBiwakBirkental.bindPopup("<b>BiwakBirkental</b><br>Biwak,Baden,Wasser,Lagerfeuer").openPopup();


let markerBadeseeLechtal = L.marker([47.433658, 10.608814]).addTo(mymap);
markerBadeseeLechtal.bindPopup("<b>Badesee Lechtal</b><br>Baden").openPopup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}
mymap.on('click', onMapClick);