const models = require('../models/footprintsModels');

const footprintsMiddleware = {};

footprintsMiddleware.getCityId = async (req, res, next) => {
    const { cityName, brewName } = req.body;



//   const answer = {
//     cityName: 'Philadelphia',
//     // brewName: '2nd Story Brewing Company'
//   }; //=>>>> CHANGE TO RES.BODY

  const citytestName = 'Philadelphia';

  let url;

  if (!res.body.cityName) {
    const urlBrewName = encodeURIComponent(answer.brewName);
    url = `https://api.openbrewerydb.org/v1/breweries?by_name=${urlBrewName}`;
  } else {
    const urlCityName = encodeURIComponent(answer.cityName);
    url = `https://api.openbrewerydb.org/v1/breweries?by_city=${urlCityName}`;
  }

  console.log(url);

  try {
    const response = await fetch(url);
    const result = await response.json();

    res.locals.result = result;

    const brewList = result.map((data) => data.name);
    const addressList = result.map((data) => data.address_1);
    const cityList = result.map((data) => data.city);
    const stateList = result.map((data) => data.state);
    const phoneList = result.map((data) => data.phone);
    const websiteList = result.map((data) => data.website_url);
    res.locals.brewList = brewList;
    res.locals.addressList = addressList;
    res.locals.cityList = cityList;
    res.locals.stateList = stateList;
    res.locals.phoneList = phoneList;
    res.locals.websiteList = websiteList;

    console.log((res.locals.brewList = brewList));

    // console.log('res.locals', res.locals.cityList)
    return next();
  } catch (error) {
    console.error(error);
  }
};

footprintsMiddleware.addFootprint = async (req, res, next) => {
  try {
    const {
      userId,
	  brewery_name,
      address,
      city,
      phone,
      record_date,
      user_rating,
      comment,
    } = req.body;

    const footprint = await models.Footprints.create({
      userId,
	  brewery_name,
      address,
      city,
      phone,
      record_date,
      user_rating,
      comment,
    });

    res.locals.footprint = footprint;
    return next();
  } catch (err) {
    return next({
      log: `Error in FootprintsMiddleware :${err}`,
      message: {
        err: `Error in FootprintsMiddleware :${err}`,
      },
      status: 500,
    });
  }
};

footprintsMiddleware.display = async (req, res, next) => {
  try {
    const footprintsList = await models.Footprints.find({});
    res.locals.footprintsList = footprintsList;
    return next();
  } catch (err) {
    return next({
      log: `Error in FootprintsMiddleware :${err}`,
      message: {
        err: `Error in FootprintsMiddleware :${err}`,
      },
      status: 500,
    });
  }
};

module.exports = footprintsMiddleware;
