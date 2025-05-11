const diskInfo = require('node-disk-info');
const path = require('path');
const os = require('os');
const fs = require('fs').promises;

async function getDisks() {
  const platform = os.type();
  if (platform === 'Windows_NT') {
    return (await diskInfo.getDiskInfo()).map((disk) => disk.mounted);
  }
  return ['/'];
}

async function getDir(dirPath) {
  const data = (await fs.readdir(dirPath, 'utf8')).map((fileName) => ({
    name: fileName,
  }));

  const stat = await Promise.allSettled(
    data.map((file) => fs.stat(path.join(dirPath, file.name)))
  );
  for (let i = 0; i < data.length; i++) {
    if (stat[i].status === 'fulfilled') {
      if (!stat[i].value.isDirectory()) data[i].size = stat[i].value.size;
      data[i].date = new Date(stat[i].value.mtimeMs);
      data[i].isDirectory = stat[i].value.isDirectory();
    }
  }
  return data;
}

module.exports = { getDisks, getDir };
