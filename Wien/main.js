let startLayer = L.tileLayer.provider("BasemapAT.grau");

let map = L.map("map", {
    center: [48.208333, 16.373056],
    zoom: 12,
    layers: [
        startLayer
    ]
});

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
}).addTo(map);

// Marker in Karte mit Hilfe von Leaflet einbetten:
let walk = L.geoJson(SPAZIERGANG, {
    pointToLayer: function(point, latlng) {
        //von Website Wien vorgesehenes Icon verwenden
        let icon = L.icon({
            iconURL: 'icons/sight.svg',
            iconSize: [32, 32]
        });
        //Marker verändern
        let marker = L.marker(latlng, {
            icon: icon
        });
        //mit console.log im Browser Struktur für das Popup herausfinden
        console.log("Point", point)
        // Popup einfügen mit hinterlegtem Namen des Markers und den interlegten Link mit "Link" anzeigen:
        //target="" ermöglicht, dass der link in einem neuen Fenster geöffnet wird
        marker.bindPopup(`<h3>${point.properties.NAME}</h3>
        <p><a target="links" href="${point.properties.WEITERE_INF}">link</a></p>
        `);
        return marker;
    }
}).addTo(map);
