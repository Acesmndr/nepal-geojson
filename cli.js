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
  country                                       provides geojson file of the entire country
  district KATHMANDU                            provides geojson file of the selected district
  province 1                                    provides geojson file of the selected province
  
  
  acesmndr 2018-2020
  `);
};

const writeFile = (filename, content) => {
  if (!fs.existsSync('geojson')) {
    fs.mkdirSync('geojson');
  }
  fs.writeFileSync(`./geojson/${filename}.geojson`, JSON.stringify(content));
};

switch (command) {
  case 'map':
    writeFile('nepal', nepalGeojson.districts());
    break;
  case 'province':
    if (!selector) {
      error();
      return;
    }
    const province = Number(selector);
    writeFile(`Province-${province}`, nepalGeojson.province(province));
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
