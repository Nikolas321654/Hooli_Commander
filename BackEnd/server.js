const http = require('http');
const url = require('url');
require('dotenv').config();
const { getDisks, getDir } = require('./modules/fs');
const port = process.env.PORT || 3000;

http
  .createServer(async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'GET' && req.url === '/disks') {
      try {
        const disks = await getDisks();
        res.end(JSON.stringify(disks));
        return;
      } catch (error) {
        console.log(error);
        res.statusCode = 500;
        res.end(error.message);
        return;
      }
    }

    if (req.method === 'GET' && req.url.startsWith('/dir')) {
      try {
        const path = url.parse(req.url, true).query.path;
        const data = await getDir(path);
        res.end(JSON.stringify(data));
      } catch (error) {
        console.log(error);
        if (error.code === 'ENOENT') {
          res.statusCode = 404;
          res.end('Not found');
        } else if (error.code === 'EACCES') {
          res.statusCode = 403;
          res.end('Access denied');
        } else {
          res.statusCode = 500;
          res.end('Unknown error');
        }
      }
    }
  })
  .listen(port, () => {
    console.log(`Hooli Commander is listening on port ${port}`);
  });
