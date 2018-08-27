const path = require('path');

export default {
  "publicPath": "/static/",
  "proxy": {
    "/api": {
      "target": "http://eatojoy-api.hktester.com",
      "changeOrigin": true,
    }
  },
  "alias": {
    "utils": path.resolve(__dirname, 'src/utils'),
    "components": path.resolve(__dirname, 'src/components'),
    "models": path.resolve(__dirname, 'src/models'),
    "assets": path.resolve(__dirname, 'src/assets')
  }
}
