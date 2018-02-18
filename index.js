// load the nepal-geojson library
const nepalGeojson = require('../index');
// replace with const nepalGeojson = require('nepal-geojson');
const colors = ['#009688', '#4CAF50', '#FF5722', '#2196F3', '#3F51B5', '#9C27B0', '#03A9F4'];

const nepal = nepalGeojson.districts(); // get all districts

// map initial settings
const map = new google.maps.Map(document.getElementById('map'), {
  mapTypeId: google.maps.MapTypeId.HYBRID,
  draggable: false,
  zoom: 7,
  scrollwheel: false,
  disableDoubleClickZoom: true,
  disableDefaultUI: true,
  center: { lat: 28.05259082333986, lng: 84.1552734375 },
});

const initialize = () => {
  map.data.addGeoJson(nepal); // load the geojson file
  // set different color for different provinces
  map.data.setStyle((feature) => {
    let color = 'gray';
    color = colors[feature.getProperty('PROVINCE') - 1];
    return ({
      fillColor: color,
      fillOpacity: 1,
      strokeWeight: 1.2,
      strokeOpacity: 1,
    });
  });
};
// mouseover handler to show the district info on the tooltip
map.data.addListener('mouseover', (event) => {
  document.getElementById('info').innerHTML = `<div>
    <div>${event.feature.getProperty('DISTRICT')}</div>
    <div>HeadQuarter: ${event.feature.getProperty('HQ')}</div>
    <div>Province: ${event.feature.getProperty('PROVINCE')}</div>
    </div>`;
});

google.maps.event.addDomListener(window, 'load', initialize);
