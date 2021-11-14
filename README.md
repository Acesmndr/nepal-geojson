# Nepal GeoJSON

[![npm version](https://badge.fury.io/js/nepal-geojson.svg)](https://badge.fury.io/js/nepal-geojson)
[![Build Status](https://travis-ci.org/Acesmndr/nepal-geojson.svg?branch=master)](https://travis-ci.org/Acesmndr/nepal-geojson)
[![license](https://img.shields.io/npm/l/express.svg)]()

* Lightweight (~600KB) packed **geojson coordinates** of Nepal's district and province boundaries for use with your map.
* Includes all **77 districts** with their **headquarters** as well as all **7 provinces**.
* Can be used as a **NPM package** in your project or you can **download** the [generated geojson files](https://github.com/Acesmndr/nepal-geojson/tree/master/generated-geojson) and use them as per your need.
* Since this is a lightweight version of the map, some tradeoff has been made so there isn't minute level accuracy of this map.
* For GaunPalikas and high resolution version of the map refer to the `highres-geojson` folder which has been scraped from https://sthaniya.gov.np/ and thus differs slightly from the lightweight version of the map and is a lot heavier since it hasn't been compressed (Work on compression is pending).

## Example Usage with Google Maps
* [acesmndr.github.io/nepal-geojson](https://acesmndr.github.io/nepal-geojson/)
* [Source Code for the Demo](https://github.com/Acesmndr/nepal-geojson/tree/master/example)

## Installation

```shell
npm i nepal-geojson
```

## Usage
### Basic Usage

```js
const nepalGeojson = require('nepal-geojson');
const districtsGeojson = nepalGeojson.districts(); // to get all the geojson for all the districts 
// Now use the district level data to plot it in the map
console.log(districtGeojson);
```

### Advanced Usage

```js
const nepalGeojson = require('nepal-geojson');
const countryGeojson = nepalGeojson.country(); // to get geojson for country without province or district level boundaries
const countryWithProvincesGeojson = nepalGeojson.countryWithProvinces(); // to get geojson for country with province level boundaries
const countryWithDistrictsGeojson = nepalGeojson.countryWithDistricts(); // to get the geojson for country with district level boundaries. It's same as nepalGeojson.districts();
const districtsGeojson = nepalGeojson.districts(); // to get all the geojson for all the districts
const provinceOneGeojson = nepalGeojson.province(1); // to get the geojson for boundary of province 1
const provinceOneGeojson = nepalGeojson.provinceWithDistricts(1); // to get the geojson for province 1 with district boundaries
const kathmanduDistrictGeojson = nepalGeojson.district('KATHMANDU'); // to get the geojson of a single district
// not only does it provide geojson files but also has helper functions to extract necessary details about the districts
const districtsList = nepalGeojson.listDistricts(); // to get an array of all the district names
const districtsInfo = nepalGeojson.districtsInfo(); // to get an array of objects of headquarter and province info for all 77 districts
const dhankutaDistrictInfo = nepalGeojson.districtInfo('DHANKUTA'); // to get info about Dhankuta district
const provincesDistrictsInfo = nepalGeojson.listProvincesWithDistricts(); // returns an array of arrays of provinces with province details each containing info objects of containing districts
const provinceDistrictsInfo = nepalGeojson.listProvinceWithDistricts(1); // returns array of info objects of districts in province 1 as well as province information
```

### CLI Usage

If you want to use it to generate geojson files in the CLI follow the following steps.
```shell
npm i -g nepal-geojson
# to build geojson for country without district or province level boundaries
nepal-geojson country
# to build geojson for country with province level boundaries
nepal-geojson country:withProvinces
# to build geojson for country with district level boundaries
nepal-geojson country:withDistricts
# to build geojson for a particular district
nepal-geojson district Kathmandu
# to get the geojson for province 1 boundaries
nepal-geojson province 1
# to get the geojson for province 1 with its districts
nepal-geojson province:withDistricts 1
```
The built geojson files are stored in **geojson** folder.

#### Alternative to CLI Usage

You could also clone the repo and run the following commands to generate the maps.
```shell
# to clone the repo
git clone git@github.com:Acesmndr/nepal-geojson.git
cd nepal-geojson
npm install
# to build geojson for country without district or province level boundaries
npm run country
# to build geojson for country with province level boundaries
npm run country:withProvinces
# to build geojson for country with district level boundaries
npm run country:withDistricts
# to build geojson for a particular district
npm run district Kathmandu
# to get the geojson for province 1 boundaries
npm run province 1
# to get the geojson for province 1 with its districts
npm run province:withDistricts 1
```

### Download Static Geojson

If you don't want to use this npm package and just want the geojson file for the entire country or a particular province and associated districts I've got you covered. I have built those and uploaded them to **generated-geojson** folder. You can find them [here](https://github.com/Acesmndr/nepal-geojson/tree/master/generated-geojson).

## Author

Aashish Manandhar <acesmndr@gmail.com>
http://github.com/acesmndr

## License

 - **MIT** : http://opensource.org/licenses/MIT

[![forthebadge](http://forthebadge.com/images/badges/uses-js.svg)](http://forthebadge.com)
[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)
