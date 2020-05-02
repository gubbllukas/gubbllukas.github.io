let startLayer = L.tileLayer.provider("BasemapAT.terrain");

let map = L.map("map", {
    center: [47.25, 11.5],
    zoom: 9,
    layers: [
        startLayer
    ]
});

let overlay = {
    adlerblicke: L.featureGroup(),
    etappen: L.featureGroup()
};

L.control.layers({
    "BasemapAT.grau": L.tileLayer.provider("BasemapAT.grau"),
    "BasemapAT": L.tileLayer.provider("BasemapAT"),
    "BasemapAT.highdpi": L.tileLayer.provider("BasemapAT.highdpi"),
    "BasemapAT.terrain": startLayer,
    "BasemapAT.surface": L.tileLayer.provider("BasemapAT.surface"),
    "BasemapAT.orthofoto": L.tileLayer.provider("BasemapAT.orthofoto"),
    "BasemapAT.overlay": L.tileLayer.provider("BasemapAT.overlay"),
    "BasemapAT.orthofoto+overlay": L.layerGroup([
        L.tileLayer.provider("BasemapAT.orthofoto"),
        L.tileLayer.provider("BasemapAT.overlay")
    ])
}, {
    "Adlerblicke": overlay.adlerblicke,
    "Adlerweg Etappen": overlay.etappen
}).addTo(map);

//Test ob Einbindung funktioniert:
//console.log(ETAPPEN);
//console.log(ADLERBLICKE);

for (const blick of ADLERBLICKE) {
    //console.log(blick);
    let mrk = L.marker([blick.lat, blick.lng], {
        icon: L.icon({
            iconSize: [32, 37],
            //-->zentriert das Icon mittig
            iconAnchor: [16, 37],
            popupAnchor: [0, -37],
            //-->jeweils manuelles Auswählen von Icon und Popup
            iconUrl: "icons/panoramicview.png"
        })
    }).addTo(overlay.adlerblicke);
    //L.marker([blick.lat,blick.lng]).addTo(map);
    mrk.bindPopup(`Standort ${blick.standort} (${blick.seehoehe}m)`)
}

overlay.adlerblicke.addTo(map);

let drawEtappe = function (nr) {
    overlay.etappen.clearLayers();

    //console.log(ETAPPEN[nr].track);
    //--> Umbau des Track-Elements so, dass das A nicht mehr darin steht
    let track = ETAPPEN[nr].track.replace("A", "");
    //console.log(track);

    //Problem: Start-Icon wird nicht angezeigt, ab track="O1"
    //Neue Variable iconNumber mit 25 aufsteigend erstellen
    //parseInt: Umwandlung von String in Integer für mathematische Rechnung
    //bei StartIconUrl ${track} durch ${iconNumer} ersetzen
    let iconNumber = track;
    if (track.startsWith("O")) {
        iconNumber = parseInt(track.replace("O", "")) + 24;
    }

    let gpx = new L.GPX(`gpx/AdlerwegEtappe${track}.gpx`, {
        async: true,
        marker_options: {
            startIconUrl: `icons/number_${iconNumber}.png`,
            endIconUrl: 'icons/finish.png',
            shadowUrl: null,
            iconSize: [32, 37],
            iconAnchor: [16, 37],
            popupAnchor: [0, -37]
        },
        polyline_options: {
            dashArray: [2, 5],
            color: "black",
            weight: 2
        }
    }).addTo(overlay.etappen);

    gpx.on("loaded", function (evt) {
        map.fitBounds(evt.target.getBounds());
    }).addTo(map);
    overlay.etappen.addTo(map);

    for (const key in ETAPPEN[nr]) {
        //const in let abgeändert, damit unten einzeln abrufbar
        let val = ETAPPEN[nr][key];
        // console.log(`et-${key}`);
        let elem = document.querySelector(`#et-${key}`);
        // if-Element eingefügt
        // wenn der key "einkehr" abgerufen wird alle "# durch ", " ersetzen
        // Schreibweise /#/g --> https://stackoverflow.com/questions/1144783/how-to-replace-all-occurrences-of-a-string
        if (elem) {
            if (key == "einkehr") {
                val = val.replace(/#/g, ", ");
            }
            elem.innerHTML = val;
            //console.log(val);
        }
    }

    // Link-gpxfile:
    // 1. Konstante mit enstsprechendem GPX-File-Namen erzeugen
    // 2. Zugriff auf html Dokument
    // 3. Verlinkung von href aus JS mit href im html
    const href = `/adlerweg/gpx/AdlerwegEtappe${track}.gpx`
    let link = document.querySelector("#gpxlink");
    link.href = href;
};

let pulldown = document.querySelector("#pulldown");

for (let i = 1; i < ETAPPEN.length; i++) {
    const etappe = ETAPPEN[i];
    //console.log(etappe);
    pulldown.innerHTML += `<option value="${i}">${etappe.titel}</option>`;
}
pulldown.onchange = function (evt) {
    let nr = evt.target.options[evt.target.options.selectedIndex].value;
    drawEtappe(nr);
}