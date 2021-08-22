const fs = require('fs');
const turf = require('@turf/union');
const GeojsonMinifier = require('geojson-minifier');

const NEPAL_GEOJSON = JSON.parse(
  fs.readFileSync(`${__dirname}/assets/nepal.geojson.packed`),
);
const PROVINCE_DETAILS = JSON.parse(
  fs.readFileSync(`${__dirname}/assets/province-details.json`),
).provinces;
const minifyr = new GeojsonMinifier({ precision: 6 });
const unpackedCoordinates = JSON.parse(minifyr.unpack(NEPAL_GEOJSON));
const numberOfDistricts = unpackedCoordinates.features.length;
const roundOff = value => Math.floor(value * 1000000) / 1000000;
for (let i = 0; i < numberOfDistricts; i += 1) {
  unpackedCoordinates.features[i].geometry.coordinates[0][0][0] = roundOff(
    unpackedCoordinates.features[i].geometry.coordinates[0][0][0],
  );
  unpackedCoordinates.features[i].geometry.coordinates[0][0][1] = roundOff(
    unpackedCoordinates.features[i].geometry.coordinates[0][0][1],
  );
}
const nepalGeojson = {
  districts() {
    return unpackedCoordinates;
  },
  district(districtName) {
    const districts = this.districts().features;
    if (districts.findIndex(
      district => district.properties.DISTRICT === districtName.toUpperCase(),
    ) === -1) {
      throw new Error(`District doesn't exist. Valid values are ${districts.map(district => district.properties.DISTRICT).join(', ')}`);
    }
    return {
      type: 'FeatureCollection',
      features: [
        districts.find(
          district => district.properties.DISTRICT === districtName.toUpperCase(),
        ),
      ],
    };
  },
  province(provinceNo) {
    const districts = this.districts().features;
    return {
      type: 'FeatureCollection',
      features: districts.filter(district => district.properties.PROVINCE === provinceNo),
    };
  },
  /** get bounding coordinates of a province without district level boundaries */
  getProvinceBoundary(provinceNo) {
    const districts = this.districts().features;
    const provinceDetails = Object.assign(districts
      .filter(district => district.properties.PROVINCE === provinceNo)
      .reduce((acc, district) => turf.default(acc, district), {
        type: 'Feature',
        properties: {},
        geometry: { type: 'Polygon', coordinates: [] },
      }), { properties: PROVINCE_DETAILS[provinceNo - 1] });
    provinceDetails.geometry.coordinates = [provinceDetails.geometry.coordinates[0]];
    return provinceDetails;
  },
  getCountryWithProvinceBoundaries() {
    const districts = this.districts().features;
    const provinces = [[], [], [], [], [], [], []];
    districts.map(district => provinces[district.properties.PROVINCE - 1].push(district));
    return {
      type: 'FeatureCollection',
      features: [
        ...provinces.map((province, idx) => {
          const provinceDetails = Object.assign(province.reduce(
            (acc, district) => turf.default(acc, district), {
              type: 'Feature',
              properties: {},
              geometry: { type: 'Polygon', coordinates: [] },
            },
          ), { properties: PROVINCE_DETAILS[idx] });
          provinceDetails.geometry.coordinates = [provinceDetails.geometry.coordinates[0]];
          return provinceDetails;
        }),
      ],
    };
  },
  /** get bounding coordinates of Nepal without province or district level boundaries */
  getCountryBoundaries() {
    const districts = this.districts().features;
    const countryBoundaries = districts
      .reduce((acc, district) => turf.default(acc, district), {
        type: 'Feature',
        properties: {},
        geometry: { type: 'Polygon', coordinates: [] },
      });
    countryBoundaries.geometry.coordinates = [countryBoundaries.geometry.coordinates[0]];
    return countryBoundaries;
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
    return this.districtsInfo().find(
      place => place.district === districtName.toUpperCase(),
    );
  },
  districtsList() {
    const districts = this.districts().features;
    return districts.map(district => district.properties.DISTRICT);
  },
  provincesWithDistricts() {
    const districts = this.districts().features;
    const provinces = [[], [], [], [], [], [], []];
    districts.map(district => provinces[district.properties.PROVINCE - 1].push({
      district: district.properties.DISTRICT,
      hq: district.properties.HQ,
    }));
    return provinces.map((provinceDistricts, pn) => ({
      province: pn + 1,
      details: PROVINCE_DETAILS[pn],
      districts: provinceDistricts,
    }));
  },
  provinceWithDistricts(provinceNumber) {
    return this.provincesWithDistricts().find(
      province => province.province === provinceNumber,
    );
  },
};
module.exports = nepalGeojson;
