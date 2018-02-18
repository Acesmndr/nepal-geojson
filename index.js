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
      name: district.properties.DISTRICT,
      headquarter: district.properties.HQ,
      province: district.properties.PROVINCE,
    }));
  },
  districtInfo(district) {
    return this.districtInfo().find(place => place.name === district.toUpperCase());
  },
  districtList() {
    const districts = this.districts().features;
    return districts.map(district => district.properties.district);
  },
  provincesWithDistricts() {
    const districts = this.districts().features;
    const provinces = new Array[7]();
    districts.map(district => provinces[district.properties.province - 1].push({ name: district.properties.DISTRICT, hq: district.properties.HQ }));
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
