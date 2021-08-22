#!/usr/bin/env node
const nepalGeojson = require('./index');
const fs = require('fs');
const args = process.argv.slice(2);
const command = args[0];
const selector = args[1] || null;

const error = () => {
  console.log(`Nepal Geojson
  
  nepal-geojson [option]
  
  Options:
  district KATHMANDU                            provides geojson file of the selected district
  province                                      provides geojson file of the boundary of selected province
  province:withDistricts                        provides geojson file of the selected province with districts
  country                                       provides geojson file of the boundary of entire country
  country:withProvinces                         provides geojson file of the entire country with province level boundaries
  country:withDistricts                         provides geojson file of the entire country with district level boundaries
  
  acesmndr 2018-2021
  `);
};

const writeFile = (filename, content) => {
  if (!fs.existsSync('geojson')) {
    fs.mkdirSync('geojson');
  }
  fs.writeFileSync(`./geojson/${filename}.geojson`, JSON.stringify(content));
};
let selected = null;
switch (command) {
  case 'country':
    writeFile('nepal', nepalGeojson.country());
    break;
  case 'country:withProvinces':
    writeFile('nepal-with-provinces', nepalGeojson.countryWithProvinces());
    break;
  case 'country:withDistricts':
    writeFile('nepal-with-districts', nepalGeojson.countryWithDistricts());
    break;
  case 'province':
    if (!selector) {
      error();
      break;
    }
    selected = Number(selector);
    writeFile(`Province-${selected}`, nepalGeojson.province(selected));
    break;
  case 'province:withDistricts':
    if (!selector) {
      error();
      break;
    }
    selected = Number(selector);
    writeFile(`Province-${selected}-with-districts`, nepalGeojson.provinceWithDistricts(selected));
    break;
  case 'district':
    if (!selector) {
      error();
      break;
    }
    selected = selector.toLocaleUpperCase();
    writeFile(`${selected}-district`, nepalGeojson.district(selected));
    break;
  default:
    error();
}
