const { assert } = require('chai');
const fs = require('fs');
const nepalGeojson = require('../index.js');

describe('nepalGeojson', () => {
  context('province()', () => {
    it('should return a province\'s geojson', () => {
      const generatedProvinceGeoJSON = JSON.parse(fs.readFileSync('generated-geojson/Province-1-acesmndr.geojson'));
      const provinceGeojson = nepalGeojson.province(1);
      assert.deepEqual(generatedProvinceGeoJSON, provinceGeojson);
    });
  });
  context('districts()', () => {
    it('should return the districts geojson', () => {
      const generatedDistrictsGeoJSON = JSON.parse(fs.readFileSync('generated-geojson/nepal-acesmndr.geojson'));
      const districtsGeoJSON = nepalGeojson.districts();
      assert.deepEqual(districtsGeoJSON, generatedDistrictsGeoJSON);
    });
  });
  context('district()', () => {
    it('should return a district\'s geojson', () => {
      const generatedDistrictGeoJSON = JSON.parse(fs.readFileSync('generated-geojson/Kathmandu-acesmndr.geojson'));
      const districtGeoJSON = nepalGeojson.district('KATHMANDU');
      assert.deepEqual(districtGeoJSON, generatedDistrictGeoJSON);
    });
  });
  context('districtInfo()', () => {
    it('should return a district\'s info', () => {
      const generatedDistrictGeoJSON = JSON.parse(fs.readFileSync('generated-geojson/Kathmandu-acesmndr.geojson')).features[0];
      const districtInfo = nepalGeojson.districtInfo('KATHMANDU');
      assert.deepEqual(districtInfo, {
        district: generatedDistrictGeoJSON.properties.DISTRICT,
        headquarter: generatedDistrictGeoJSON.properties.HQ,
        province: generatedDistrictGeoJSON.properties.PROVINCE,
      });
    });
  });
  context('districtsList()', () => {
    it('should return the district\'s list', () => {
      const generatedDistrictsGeoJSON = JSON.parse(fs.readFileSync('generated-geojson/nepal-acesmndr.geojson'));
      const generatedDistrictsList = generatedDistrictsGeoJSON.features.map(district => district.properties.DISTRICT);
      const districtsList = nepalGeojson.districtsList();
      assert.deepEqual(districtsList, generatedDistrictsList);
    });
  });
  context('provinceWithDistricts()', () => {
    it('should return a province with district', () => {
      const generatedProvinceGeoJSON = JSON.parse(fs.readFileSync('generated-geojson/Province-1-acesmndr.geojson'));
      const generatedProvinceDistricts = generatedProvinceGeoJSON.features.map(district => ({
        district: district.properties.DISTRICT,
        hq: district.properties.HQ,
      }));
      const provinceData = nepalGeojson.provinceWithDistricts(1);
      assert.deepEqual(provinceData, {
        province: 1,
        districts: generatedProvinceDistricts,
      });
    });
  });
});
