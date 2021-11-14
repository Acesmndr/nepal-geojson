/** Data scraped from https://sthaniya.gov.np/ for High res files */
const fs = require('fs');
const request = require('xhr-request');

const districts = [];

const writeFile = (filename, content) => {
  if (!fs.existsSync('highres-geojson')) {
    fs.mkdirSync('highres-geojson');
  }
  fs.writeFileSync(`./highres-geojson/${filename}.geojson`, JSON.stringify(content));
};

const fetchJSON = (url, params = { json: true }) => new Promise((resolve, reject) => {
  request(
    url,
    params,
    (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    },
  );
});

const fetchDistrict = async (district) => {
  const districtName = district[0].toUpperCase() + district.substring(1);
  const provinceData = await fetchJSON(
    `https://sthaniya.gov.np/gis/data/Dist_GaPa/${districtName}.json`,
  );
  writeFile(`${districtName}-District`, provinceData);
};

const fetchProvince = async (num) => {
  const provinceData = await fetchJSON(
    `https://sthaniya.gov.np/gis/data/Province${num}.json`,
  );
  districts.push(...provinceData.features.map(dist => dist.properties.TARGET.toLowerCase()));
  writeFile(`Province${num}`, provinceData);
};

const fetchProvinces = async () => Promise.all([
  fetchProvince(1),
  fetchProvince(2),
  fetchProvince(3),
  fetchProvince(4),
  fetchProvince(5),
  fetchProvince(6),
  fetchProvince(7),
]);

(async () => {
  const countryData = await fetchJSON(
    'https://sthaniya.gov.np/gis/data/countries.json',
    {},
  );
  const countryWithProvinces = JSON.parse(countryData.slice(16));
  writeFile('Nepal-provinces', countryWithProvinces);
  await fetchProvinces();
  await Promise.all(districts.map(dist => fetchDistrict(dist)));
})();
