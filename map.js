var mymap = L.map('mapid').setView([19.380142, -99.142966], 11);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoib21hci1uYXZhcnJvIiwiYSI6ImNpanN2ZWZxZzBoa291eWx4ZWdsajl1OGIifQ.SH4OG9811nirTGJ3rE4DHw'
}).addTo(mymap);

// COLORES
function choroplethize(d) {
    return d > 236178 ? '#88419d' :
        d > 107693 ? '#8c96c6' :
        d > 54440 ? '#b3cde3' :
            '#edf8fb';
}

// PINTAR LAS FIGURAS CON LOS COLORES
function styleVentas2017_03(feature) {
    return {
        weight: .75,
        opacity: 0.5,
        color: 'grey',
        dashArray: '0',
        fillOpacity: 0.9,
        fillColor: choroplethize(feature.properties.ventas2017_03_Monto)
    }
}
function styleVentas2017_04(feature) {
    return {
        weight: .75,
        opacity: 0.5,
        color: 'grey',
        dashArray: '0',
        fillOpacity: 0.9,
        fillColor: choroplethize(feature.properties.ventas2017_04_Monto)
    }
}
function styleVentas2017_05(feature) {
    return {
        weight: .75,
        opacity: 0.5,
        color: 'grey',
        dashArray: '0',
        fillOpacity: 0.9,
        fillColor: choroplethize(feature.properties.ventas2017_05_Monto)
    }
}
// CREAR VARIABLES PARA LAS CAPAS
var Ventas2017_03Layer = L.geoJSON(Ventas2017_03, {
    style: styleVentas2017_03,
    onEachFeature: geojsonPopupVentas2017_03,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng);
    }
});
var Ventas2017_04Layer = L.geoJSON(Ventas2017_04, {
    style: styleVentas2017_04,
    onEachFeature: geojsonPopupVentas2017_04,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng);
    }
});
var Ventas2017_05Layer = L.geoJSON(Ventas2017_05, {
    style: styleVentas2017_05,
    onEachFeature: geojsonPopupVentas2017_05,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng);
    }
});

// CREAR CAJAS AL MOMENTO DE HACER CLIC
function geojsonPopupVentas2017_03(feature, layer) {
    if (feature.properties.NOMLOC) {
        layer.bindPopup('Monto:   ' + feature.properties.ventas2017_03_Monto)
    }
}
function geojsonPopupVentas2017_04(feature, layer) {
    if (feature.properties.NOMLOC) {
        layer.bindPopup('Monto:   ' + feature.properties.ventas2017_04_Monto)
    }
}
function geojsonPopupVentas2017_05(feature, layer) {
    if (feature.properties.NOMLOC) {
        layer.bindPopup('Monto:   ' + feature.properties.ventas2017_05_Monto)
    }
}

// dibujar al mapa
Ventas2017_03Layer.addTo(mymap);
var featureLayers = {
    "Ventas de marzo 2017": Ventas2017_03Layer,
    "Ventas de abril 2017": Ventas2017_04Layer,
    "Ventas de mayo 2017": Ventas2017_05Layer
};
var geojson = L.control.layers(featureLayers, null, {
    collapsed: false
}).addTo(mymap);

// leyenda empieza aqui
var Ventas2017_03Legend = L.control({ position: 'bottomright' });
var Ventas2017_04Legend = L.control({ position: 'bottomright' });
var Ventas2017_05Legend = L.control({ position: 'bottomright' });

Ventas2017_03Legend.onAdd = function (mymap) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 54440, 107693, 236178],
        labels = ['ventas por alcadía'],
        from, to;
    for (var i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];
        labels.push(
            '<i style="background:' + choroplethize(from + 1) + '"></i> ' +
            from + (to ? ' - ' + to : ' - 288817'));
    }
    div.innerHTML = labels.join('<br>');
    return div;
};
Ventas2017_04Legend.onAdd = function (mymap) {
    var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 54440, 107693, 236178],
    labels = ['ventas por alcadía'],
        from, to;
    for (var i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];
        labels.push(
            '<i style="background:' + choroplethize(from + 1) + '"></i> ' +
            from + (to ? ' - ' + to : ' - 288817'));
    }
    div.innerHTML = labels.join('<br>');
    return div;
};
Ventas2017_05Legend.onAdd = function (mymap) {
    var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 54440, 107693, 236178],
    labels = ['ventas por alcadía'],
        from, to;
    for (var i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];
        labels.push(
            '<i style="background:' + choroplethize(from + 1) + '"></i> ' +
            from + (to ? ' - ' + to : ' - 288817'));
    }
    div.innerHTML = labels.join('<br>');
    return div;
};
Ventas2017_03Legend.addTo(mymap);
let currentLegend = Ventas2017_03Legend;

// Leyenda
mymap.on('baselayerchange', function (eventLayer) {
    if (eventLayer.name === 'Ventas de marzo 2017') {
        mymap.removeControl(currentLegend);
        currentLegend = Ventas2017_03Legend;
        Ventas2017_03Legend.addTo(mymap);
    }
    else if (eventLayer.name === 'Ventas de abril 2017') {
        mymap.removeControl(currentLegend);
        currentLegend = Ventas2017_04Legend;
        Ventas2017_04Legend.addTo(mymap);
    }
    else if (eventLayer.name === 'Ventas de mayo 2017') {
        mymap.removeControl(currentLegend);
        currentLegend = Ventas2017_05Legend;
        Ventas2017_05Legend.addTo(mymap);
    }
});