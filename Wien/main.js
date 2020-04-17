let startLayer = L.tileLayer.provider("BasemapAT.grau");

let map = L.map("map", {
    center: [48.208333, 16.373056],
    zoom: 12,
    layers: [
        startLayer
    ]
});

let sightGroup = L.markerClusterGroup().addTo(map);

let walkGroup = L.featureGroup().addTo(map);
let heritageGroup = L.featureGroup().addTo(map);

L.control.layers({
    "BasemapAT.grau": startLayer,
    "BasemapAT": L.tileLayer.provider("BasemapAT"),
    "BasemapAT.highdpi": L.tileLayer.provider("BasemapAT.highdpi"),
    "BasemapAT.terrain": L.tileLayer.provider("BasemapAT.terrain"),
    "BasemapAT.surface": L.tileLayer.provider("BasemapAT.surface"),
    "BasemapAT.orthofoto": L.tileLayer.provider("BasemapAT.orthofoto"),
    "BasemapAT.overlay": L.tileLayer.provider("BasemapAT.overlay"),
    "BasemapAT.orthofoto+overlay": L.layerGroup([
        L.tileLayer.provider("BasemapAT.orthofoto"),
        L.tileLayer.provider("BasemapAT.overlay")
    ])
},{
    "Stadtspaziergang (Punkte)": sightGroup,
    "Wanderungen": walkGroup,
    "Weltkulturerbe": heritageGroup
}).addTo(map);

//Direkte Einbettung der Daten und Abrufen vom Server:
//Vorteil, dass immer aktuelle Daten vom Server verwendet werden:
let sightUrl = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:SPAZIERPUNKTOGD&srsName=EPSG:4326&outputFormat=json"

let sights = L.geoJson.ajax(sightUrl, {
    pointToLayer: function(point, latlng) {
        //von Website Wien vorgesehenes Icon verwenden
        let icon = L.icon({
            iconUrl: 'icons/sight.svg',
            iconSize: [32, 32]
        });
        //Marker verändern
        let marker = L.marker(latlng, {
            icon: icon
        });
        //mit console.log im Browser Struktur für das Popup herausfinden
        // console.log("Point", point)
        // Popup einfügen mit hinterlegtem Namen des Markers und den interlegten Link mit "Link" anzeigen:
        // und Bemerkungstext anzeigen lassen
        //target="" ermöglicht, dass der link in einem neuen Fenster geöffnet wird
        marker.bindPopup(`<h3>${point.properties.NAME}</h3>
        <p>${point.properties.BEMERKUNG}</p>
        <p><a target="links" href="${point.properties.WEITERE_INF}">link</a></p>
        `);
        return marker;
    }
});

sights.on("data:loaded", function() {
    sightGroup.addLayer(sights);
    console.log('data loaded!');
    map.fitBounds(sightGroup.getBounds());
});


let wandern = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:WANDERWEGEOGD&srsName=EPSG:4326&outputFormat=json";
L.geoJson.ajax(wandern, {
    style: function() {
        return {color: "green", weight: 5};
    }
}).addTo(walkGroup);

let heritage = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:WELTKULTERBEOGD&srsName=EPSG:4326&outputFormat=json";
L.geoJson.ajax(heritage, {
    style: function() {
        return {color: "salmon", fillOpacity: 0.3};
    },
    onEachFeature: function(feature, layer) {
        console.log(feature);
        layer.bindPopup(`<h3>${feature.properties.NAME}</h3>
        <p>${feature.properties.INFO}</p>
        `);
    }
}).addTo(heritageGroup);