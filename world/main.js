let startLayer = L.tileLayer.provider("OpenTopoMap")
let map = L.map("map", {
    center: [30, 0],
    zoom: 2,
    layers: [
        startLayer
    ]
});

let circleGroup = L.featureGroup().addTo(map);

L.control.layers({
    "OpenTopoMap": startLayer,
    "OpenStreetMap.Mapnik": L.tileLayer.provider("OpenStreetMap.Mapnik"),
    "Esri.WorldImagery": L.tileLayer.provider("Esri.WorldImagery"),
    "Esri.OceanBasemap": L.tileLayer.provider("Esri.OceanBasemap"),
    "NASAGIBS.ViirsEarthAtNight2012": L.tileLayer.provider("NASAGIBS.ViirsEarthAtNight2012"),
    "Stamen.Watercolor": L.tileLayer.provider("Stamen.Watercolor")
}, {
    "Thematische Darstellung": circleGroup
}).addTo(map);

// L.marker([0,0]).addTo(map);
// console.log(CONFIRMED);
// for-Schleife über alle Arrays der CONFIRMED Einträge:

let drawCircles = function () {
    let data = CONFIRMED;
    let header = CONFIRMED[0];
    let index = header.length - 1; //entspricht Zugriff auf letzten Wert im Header
    let options = document.querySelector("#pulldown").options;
    let value = options[options.selectedIndex].value;
    let label = options[options.selectedIndex].text;
    let color;
    // console.log(value,label,options);

    if (value === "confirmed") {
        data = CONFIRMED;
        color = "blue";
    } else if (value === "deaths") {
        data = DEATHS;
        color = "purple";
    } else {
        data = RECOVERED;
        color = "green";
    }
    //Datum & Thema anzeigen:
    document.querySelector("#datum").innerHTML = `am ${header[index]} - ${label}`;

    circleGroup.clearLayers();

    for (let i = 1; i < data.length; i++) {
        let row = data[i];
        // console.log(row[2],row[3]);
        let reg = `${row[0]} ${row[1]}`;
        let lat = row[2];
        let lng = row[3];
        let val = row[row.length - 1];
        // let mrk = L.marker([lat,lng]).addTo(map);
        // mrk.bindPopup(`${reg}: ${val}`);

        // A = r²*PI
        // r² = A/PI
        // r = WURZEL(A/PI)
        let s = 0.2
        let r = Math.sqrt(val * s / Math.PI);
        let circle = L.circleMarker([lat, lng], {
            radius: r,
            color: color
        }).addTo(circleGroup);
        circle.bindPopup(`${reg}: ${val}`);
    }
};

document.querySelector("#pulldown").onchange = function () {
    drawCircles()
};

drawCircles();
// drawCircles(RECOVERED);
// drawCircles(DEATH);