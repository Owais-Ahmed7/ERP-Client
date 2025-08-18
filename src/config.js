module.exports = {
  google: {
    API_KEY: "",
    CLIENT_ID: "",
    SECRET: "",
  },
  facebook: {
    APP_ID: "",
  },
  api: {
    BASE_URL: process.env.REACT_APP_BASE_URL || "",
    API_URL: process.env.REACT_APP_API_URL || "",
    AUTH_SERVICE_URL: process.env.REACT_APP_AUTH_SERVICE_URL || "",
  },
};
