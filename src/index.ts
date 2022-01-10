/** Use Axios to get data from restcountries api */
import axios from 'axios';

/** Use the free API https://restcountries.eu/
 * You will use the following endpoints
 * https://restcountries.eu/rest/v2/name/{name} for countries by name
 * https://restcountries.eu/rest/v2/regionalbloc/{regionalbloc} for region blocks
 */

/** Create getCountry Function here */
async function getCountry(country: string): Promise<any> {
  try {
    //console.log('before webApi call');

    const getApi = await axios(`https://restcountries.com/v2/name/${country}`);
    const data = getApi.data[0];

    // console.log('finished webApi call. weg got:');
    // console.log(getApi.data);

    return {
      capital: data.capital,
      region: data.region,
      numericCode: data.numericCode
    };
  } catch (e) {
    console.error(`error: ${JSON.stringify(e)}`);
    throw e; // rethrow error or return null, if the request failed
  }
}

/** Create a test for this getRegion function */
async function getRegionCountries(regionalbloc: string): Promise<string[]> {
  const getApi = await axios(
    `https://restcountries.com/v2/regionalbloc/${regionalbloc}`
  );
  const data = getApi.data;
  const countries = [];
  for (let i = 0; i < data.length; i++) {
    countries.push(data[i].name);
  }
  return countries;
}

/** Create getRegionCapitals function here */
async function getRegionCapitals(region: string): Promise<string[]> {
  const getApi = await axios(
    `https://restcountries.com/v2/regionalbloc/${region}`
  );
  const data = getApi.data;
  const capitals = [];
  for (let i = 0; i < data.length; i++) {
    capitals.push(data[i].capital);
  }
  return capitals;
}

export default {
  getCountry,
  getRegionCountries,
  getRegionCapitals
};
