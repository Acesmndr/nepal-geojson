#!/usr/bin/env node
const nepalGeojson = require('./index');
const fs = require('fs');

const arg = (process.argv.slice(-1)[0]);

const error = () => {
  console.log(`Nepal Geojson
  
  nepal-geojson [option]
  
  Options:
  districts                                     provides geojson file of the entire country
  district=KATHMANDU                            provides geojson file of the selected district
  province=1                                    provides geojson file of the selected province
  
  
  acesmndr 2018
  `);
};

const writeFile = (filename, content) => {
  if (!fs.existsSync('geojson')) {
    fs.mkdirSync('geojson');
  }
  fs.writeFileSync(`./geojson/${filename}.geojson`, JSON.stringify(content));
};

if (arg.includes('districts')) {
  writeFile('nepal', nepalGeojson.districts());
} else if (arg.includes('province')) {
  const provinceNumber = arg.replace('province', '');
  if (provinceNumber.length) {
    const province = Number(provinceNumber.substr(1));
    writeFile(`Province-${province}`, nepalGeojson.province(province));
  } else {
    error();
  }
} else if (arg.includes('district')) {
  const districtName = arg.replace('district', '');
  if (districtName.length) {
    const district = districtName.substr(1);
    writeFile(`${district}-district`, nepalGeojson.district(district));
  } else {
    error();
  }
} else {
  error();
}
