const fs = require('fs');
const GeojsonMinifier = require('geojson-minifier');

const NEPAL_GEOJSON = JSON.parse(fs.readFileSync(`${__dirname}/assets/nepal.geojson.packed`));
const minifyr = new GeojsonMinifier({ precision: 6 });
const unpackedCoordinates = JSON.parse(minifyr.unpack(NEPAL_GEOJSON));
const numberOfDistricts = unpackedCoordinates.features.length;
const roundOff = value => Math.floor(value * 1000000) / 1000000;
for (let i = 0; i < numberOfDistricts; i += 1) {
  unpackedCoordinates.features[i].geometry.coordinates[0][0][0] = roundOff(unpackedCoordinates.features[i].geometry.coordinates[0][0][0]);
  unpackedCoordinates.features[i].geometry.coordinates[0][0][1] = roundOff(unpackedCoordinates.features[i].geometry.coordinates[0][0][1]);
}
const nepalGeojson = {
  districts() {
    return unpackedCoordinates;
  },
  district(districtName) {
    const districts = this.districts().features;
    return {
      type: 'FeatureCollection',
      features: [districts.find(district => district.properties.DISTRICT === districtName.toUpperCase())],
    };
  },
  province(provinceNo) {
    const districts = this.districts().features;
    return {
      type: 'FeatureCollection',
      features: districts.filter(district => district.properties.PROVINCE === provinceNo),
    };
  },
  districtsInfo() {
    const districts = this.districts().features;
    return districts.map(district => ({
      district: district.properties.DISTRICT,
      headquarter: district.properties.HQ,
      province: district.properties.PROVINCE,
    }));
  },
  districtInfo(districtName) {
    return this.districtsInfo().find(place => place.district === districtName.toUpperCase());
  },
  districtsList() {
    const districts = this.districts().features;
    return districts.map(district => district.properties.DISTRICT);
  },
  provincesWithDistricts() {
    const districts = this.districts().features;
    const provinces = [[], [], [], [], [], [], []];
    districts.map(district => provinces[district.properties.PROVINCE - 1].push({ district: district.properties.DISTRICT, hq: district.properties.HQ }));
    return provinces.map((provinceDistricts, pn) => ({
      province: pn + 1,
      districts: provinceDistricts,
    }));
  },
  provinceWithDistricts(provinceNumber) {
    return this.provincesWithDistricts().find(province => province.province === provinceNumber);
  },
};
module.exports = nepalGeojson;
