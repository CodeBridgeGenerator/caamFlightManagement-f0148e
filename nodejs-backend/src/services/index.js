const companies = require("./companies/companies.service.js");
const flights = require("./flights/flights.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(companies);
  app.configure(flights);
    // ~cb-add-configure-service-name~
};
