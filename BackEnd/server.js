require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { getDisks, getDir } = require('./modules/fs');
const port = process.env.PORT || 3000;
const app = express();
app.use(cors());

app.get('/disks', async (req, res) => {
  try {
    const disks = await getDisks();
    res.send(disks);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

app.get('/dir', async (req, res) => {
  try {
    const data = await getDir(req.query.path);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Hooli Commander is listening on port ${port}`);
});
