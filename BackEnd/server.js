const express = require('express');
const fs = require('fs').promises;
const diskInfo = require('node-disk-info');
const app = express();
const PORT = 3000;

app.get('/disks', async (req, res) => {
  try {
    const disks = (await diskInfo.getDiskInfo()).map((disk) => disk.mounted);
    res.send(disks);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

app.get('/dir', async (req, res) => {
  try {
    const path = req.query.path;
    const data = (await fs.readdir(path, 'utf8')).map((fileName) => ({
      name: fileName,
    }));
    const stat = await Promise.allSettled(
      data.map((file) => fs.stat(`${path}/${file.name}`))
    );
    for (let i = 0; i < data.length; i++) {
      if (stat[i].status === 'fulfilled') {
        if (!stat[i].value.isDirectory()) data[i].size = stat[i].value.size;
        data[i].date = new Date(stat[i].value.mtimeMs);
        data[i].isDirectory = stat[i].value.isDirectory();
      }
    }
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Hooli Commander is listening on port ${PORT}`);
});
