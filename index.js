const fs = require('fs');
const GeojsonMinifier = require('geojson-minifier');

const NEPAL_GEOJSON = JSON.parse(fs.readFileSync(`${__dirname}/assets/nepal.geojson.packed`));
const _roundOff = value => Math.floor(value * 1000000) / 1000000;
const nepalGeojson = {
  districts() {
    const minifyr = new GeojsonMinifier({ precision: 6 });
    const unpackedCoordinates = JSON.parse(minifyr.unpack(NEPAL_GEOJSON));
    for (let i = 0; i < 75; i += 1) {
      unpackedCoordinates.features[i].geometry.coordinates[0][0][0] = _roundOff(unpackedCoordinates.features[i].geometry.coordinates[0][0][0]);
      unpackedCoordinates.features[i].geometry.coordinates[0][0][1] = _roundOff(unpackedCoordinates.features[i].geometry.coordinates[0][0][1]);
    }
    return unpackedCoordinates;
  },
};
module.exports = nepalGeojson;
