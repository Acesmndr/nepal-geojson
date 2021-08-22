#!/usr/bin/env node
const nepalGeojson = require('./index');
const fs = require('fs');
const args = process.argv.slice(2);
const command = args[0];
const selector = args[1] || null;
const withoutInternalFeatures = args[2] || false;

const error = () => {
  console.log(`Nepal Geojson
  
  nepal-geojson [option]
  
  Options:
  district KATHMANDU                            provides geojson file of the selected district
  province 1                                    provides geojson file of the selected province
  province 1 true                               provides geojson file of the boundary of selected province
  country                                       provides geojson file of the entire country with district level boundaries
  country withProvinces                         provides geojson file of the entire country with province level boundaries
  country withoutProvinces                      provides geojson file of the entire country without internal district or province boundaries
  acesmndr 2018-2021
  `);
};

const writeFile = (filename, content) => {
  if (!fs.existsSync('geojson')) {
    fs.mkdirSync('geojson');
  }
  fs.writeFileSync(`./geojson/${filename}.geojson`, JSON.stringify(content));
};

switch (command) {
  case 'country':
    if(!selector) {
      writeFile('nepal-districts', nepalGeojson.districts());
      return;
    }
    console.log(selector);
    if(selector === 'withProvinces') {
      writeFile('nepal-provinces', nepalGeojson.getCountryWithProvinceBoundaries());
    } else {
      console.log('Hello');
      writeFile('nepal', nepalGeojson.getCountryBoundaries());
    }
    break;
  case 'province':
    if (!selector) {
      error();
      return;
    }
    const province = Number(selector);
    if (withoutInternalFeatures) {
      writeFile(`Province-${province}-boundaries`, nepalGeojson.getProvinceBoundary(province));
    } else {
      writeFile(`Province-${province}`, nepalGeojson.province(province));
    }
    break;
  case 'district':
    if (!selector) {
      error();
      return;
    }
    const district = selector.toLocaleUpperCase();
    writeFile(`${district}-district`, nepalGeojson.district(district));
    break;
  default:
    error();
}
