# Nepal GeoJSON
[![npm](https://img.shields.io/badge/npm-v1.0.1-green.svg)]()
[![Build Status](https://travis-ci.org/Acesmndr/nepal-geojson.svg?branch=master)](https://travis-ci.org/Acesmndr/nepal-geojson)
[![license](https://img.shields.io/npm/l/express.svg)]()

Lightweight (600KB) geojson coordinates of Nepal's district boundaries for use with your map.

## Installation
```shell
npm i nepal-geojson
```

## Usage
```js
const nepalGeojson = require('nepal-geojson');
const districtGeojson = nepalGeojson.districts();
// Now use the district level data to plot it in the map
console.log(districtGeojson);
```

## Author

Aashish Manandhar <acesmndr@gmail.com>
http://github.com/acesmndr

## License

 - **MIT** : http://opensource.org/licenses/MIT

[![forthebadge](http://forthebadge.com/images/badges/uses-js.svg)](http://forthebadge.com)
[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)