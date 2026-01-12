const axios = require("axios");

global.cy = {
  request: ({ url, method = "GET" }) => {
    return axios({
      method,
      url,
      validateStatus: () => true,
    }).then((response) => {
      return {
        status: response.status,
        body: response.data,
      };
    });
  },
};
