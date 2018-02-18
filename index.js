const fs = require('fs');
const GeojsonMinifier = require('geojson-minifier');

const NEPAL_GEOJSON = JSON.parse(fs.readFileSync(`${__dirname}/assets/nepal.geojson.packed`));
const roundOff = value => Math.floor(value * 1000000) / 1000000;
const nepalGeojson = {
  districts() {
    const minifyr = new GeojsonMinifier({ precision: 6 });
    const unpackedCoordinates = JSON.parse(minifyr.unpack(NEPAL_GEOJSON));
    const numberOfDistricts = unpackedCoordinates.features.length;
    for (let i = 0; i < numberOfDistricts; i += 1) {
      unpackedCoordinates.features[i].geometry.coordinates[0][0][0] = roundOff(unpackedCoordinates.features[i].geometry.coordinates[0][0][0]);
      unpackedCoordinates.features[i].geometry.coordinates[0][0][1] = roundOff(unpackedCoordinates.features[i].geometry.coordinates[0][0][1]);
    }
    return unpackedCoordinates;
  },
};
module.exports = nepalGeojson;
