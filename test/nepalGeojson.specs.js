const { assert } = require('chai');
const fs = require('fs');
const nepalGeojson = require('../index.js');

describe('nepalGeojson', () => {
  const districtGeoJSON = JSON.parse(fs.readFileSync('test/district.json'));

  describe('districts()', () => {
    it('should return the districts geojson', () => {
      const _districtsGeoJSON = nepalGeojson.districts();
      assert.deepEqual(districtGeoJSON.features[0], _districtsGeoJSON.features[0]);
    });
  });
});
