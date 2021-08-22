const { assert } = require('chai');
const fs = require('fs');
const nepalGeojson = require('../index.js');

describe('nepalGeojson', () => {
  context('province()', () => {
    it('should return a province\'s boundary geojson', () => {
      const generatedProvinceGeoJSON = JSON.parse(fs.readFileSync('generated-geojson/Province 1/Province-1.geojson'));
      const provinceGeojson = nepalGeojson.province(1);
      assert.deepEqual(generatedProvinceGeoJSON, provinceGeojson);
    });
  });
  context('provinceWithDistricts()', () => {
    it('should return a province\'s boundary geojson with associated districts', () => {
      const generatedProvinceGeoJSON = JSON.parse(fs.readFileSync('generated-geojson/Province 1/Province-1-with-districts.geojson'));
      const provinceGeojson = nepalGeojson.provinceWithDistricts(1);
      assert.deepEqual(generatedProvinceGeoJSON, provinceGeojson);
    });
  });
  context('districts()', () => {
    it('should return the districts geojson', () => {
      const generatedDistrictsGeoJSON = JSON.parse(fs.readFileSync('generated-geojson/nepal-with-districts-acesmndr.geojson'));
      const districtsGeoJSON = nepalGeojson.districts();
      assert.deepEqual(districtsGeoJSON, generatedDistrictsGeoJSON);
    });
  });
  context('district()', () => {
    it('should return a district\'s geojson', () => {
      const generatedDistrictGeoJSON = JSON.parse(fs.readFileSync('generated-geojson/Province 3/Districts/KATHMANDU.geojson'));
      const districtGeoJSON = nepalGeojson.district('KATHMANDU');
      assert.deepEqual(districtGeoJSON, generatedDistrictGeoJSON);
    });
  });
  context('countryWithDistricts()', () => {
    it('should return the country geojson with districts', () => {
      const generatedCountryGeoJSON = JSON.parse(fs.readFileSync('generated-geojson/nepal-with-districts-acesmndr.geojson'));
      const countryGeoJSON = nepalGeojson.countryWithDistricts();
      assert.deepEqual(countryGeoJSON, generatedCountryGeoJSON);
    });
  });
  context('countryWithProvinces()', () => {
    it('should return the country geojson with provinces', () => {
      const generatedCountryGeoJSON = JSON.parse(fs.readFileSync('generated-geojson/nepal-with-provinces-acesmndr.geojson'));
      const countryGeoJSON = nepalGeojson.countryWithProvinces();
      assert.deepEqual(countryGeoJSON, generatedCountryGeoJSON);
    });
  });
  context('country()', () => {
    it('should return the country geojson with provinces', () => {
      const generatedCountryGeoJSON = JSON.parse(fs.readFileSync('generated-geojson/nepal-acesmndr.geojson'));
      const countryGeoJSON = nepalGeojson.country();
      assert.deepEqual(countryGeoJSON, generatedCountryGeoJSON);
    }).timeout(10000);
  });
  context('districtInfo()', () => {
    it('should return a district\'s info', () => {
      const generatedDistrictGeoJSON = JSON.parse(fs.readFileSync('generated-geojson/Province 3/Districts/KATHMANDU.geojson')).features[0];
      const districtInfo = nepalGeojson.districtInfo('KATHMANDU');
      assert.deepEqual(districtInfo, {
        district: generatedDistrictGeoJSON.properties.DISTRICT,
        headquarter: generatedDistrictGeoJSON.properties.HQ,
        province: generatedDistrictGeoJSON.properties.PROVINCE,
      });
    });
  });
  context('listDistricts()', () => {
    it('should return the district\'s list', () => {
      const generatedDistrictsGeoJSON = JSON.parse(fs.readFileSync('generated-geojson/nepal-with-districts-acesmndr.geojson'));
      const generatedListOfDistricts = generatedDistrictsGeoJSON.features.map(district => district.properties.DISTRICT);
      const listDistricts = nepalGeojson.listDistricts();
      assert.deepEqual(listDistricts, generatedListOfDistricts);
    });
  });
  context('provinceWithDistricts()', () => {
    it('should return a province with district', () => {
      const generatedProvinceGeoJSON = JSON.parse(fs.readFileSync('generated-geojson/Province 1/Province-1-with-districts.geojson'));
      const generatedProvinceDistricts = generatedProvinceGeoJSON.features.map(district => ({
        district: district.properties.DISTRICT,
        hq: district.properties.HQ,
      }));
      const provinceData = nepalGeojson.listProvinceWithDistricts(1);
      assert.deepEqual(provinceData, {
        province: 1,
        details: {
          id: 1,
          name: 'Province No. 1',
          capital: 'Biratnagar',
        },
        districts: generatedProvinceDistricts,
      });
    });
  });
});
