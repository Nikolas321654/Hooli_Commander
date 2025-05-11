import { getDisks, getDir } from './fs.js';
import { parse } from 'url';

export async function routing(req) {
  if (req.method === 'GET' && req.url === '/disks') {
    const disks = await getDisks();
    return disks;
  }
  if (req.method === 'GET' && req.url.startsWith('/dir')) {
    const path = parse(req.url, true).query.path;
    const data = await getDir(path);
    return data;
  }
}
