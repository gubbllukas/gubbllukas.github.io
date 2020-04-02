let startLayer = L.tileLayer.provider("OpenTopoMap")
let map = L.map("map", {
    center: [0,0],
    zoom: 2,
    layers: [
        startLayer
    ]
});

L.control.layers({
    "OpenTopoMap": startLayer,
    "OpenStreetMap.Mapnik": L.tileLayer.provider("OpenStreetMap.Mapnik"),
    "Esri.WorldImagery": L.tileLayer.provider("Esri.WorldImagery"),
    "Esri.OceanBasemap": L.tileLayer.provider("Esri.OceanBasemap"),
    "NASAGIBS.ViirsEarthAtNight2012": L.tileLayer.provider("NASAGIBS.ViirsEarthAtNight2012"),
    "Stamen.Watercolor": L.tileLayer.provider("Stamen.Watercolor")
}).addTo(map);

L.marker([0,0]).addTo(map);