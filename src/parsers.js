import yaml from 'js-yaml';
import { readFileSync } from 'node:fs';
import path from 'path';

export default (filePath) => {
  const absolutePath = path.resolve(filePath);
  console.log(absolutePath);
  if ((path.extname(absolutePath) === '.yml') || (path.extname(absolutePath) === '.yaml')) {
    return yaml.load(readFileSync(absolutePath, 'utf-8'));
  }
  if (path.extname(absolutePath) === '.json') {
    return JSON.parse(readFileSync(absolutePath, 'utf-8'));
  }
  return 'unexpected format of file';
};
