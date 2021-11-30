class DbService {
  sanitizeHtml = require("sanitize-html");

  arrayValidator(array) {
    return array
      .map((e) => e === "undefined" || Number.isNaN(e))
      .filter((e) => e).length
      ? false
      : true;
  };

}

module.exports = DbService;
