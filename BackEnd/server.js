const http = require('http');
const { handleError } = require('./errors.js');
const { routing } = require('./router.js');
const port = process.env.PORT || 3000;

http
  .createServer(async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    try {
      res.end(JSON.stringify(await routing(req)));
    } catch (error) {
      console.error(error);
      handleError(error, res);
    }
  })
  .listen(port, () => {
    console.log(`Hooli Commander is listening on port ${port}`);
  });
