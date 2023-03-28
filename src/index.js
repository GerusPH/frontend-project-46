import _ from 'lodash';
import { readFileSync } from 'node:fs';
import path from 'path';
import { cwd } from 'node:process';

const genDiff = (firstPath, secondPath) => {
  const filepath1 = path.resolve(`${cwd()}`, `${firstPath}`);
  const filepath2 = path.resolve(`${cwd()}`, `${secondPath}`);
  const file1 = JSON.parse(readFileSync(filepath1, 'utf-8'));
  const file2 = JSON.parse(readFileSync(filepath2, 'utf-8'));
  const file1keys = Object.keys(file1);
  const file2keys = Object.keys(file2);
  const allKeys = _.sortBy(_.union(file2keys, file1keys));
  const difference = (acc, key) => {
    if (_.has(file1, key) && _.has(file2, key)) {
      if (file1[key] === file2[key]) {
        acc.push(`  ${key}: ${file1[key]}`);
      } else {
        acc.push(`- ${key}: ${file1[key]}`);
        acc.push(`+ ${key}: ${file2[key]}`);
      }
    } else if (_.has(file1, key) && !_.has(file2, key)) {
      acc.push(`- ${key}: ${file1[key]}`);
    } else {
      acc.push(`+ ${key}: ${file2[key]}`);
    }
    return acc;
  };
  const diffs = allKeys.reduce(difference, []);

  return `{\n ${diffs.join('\n ')}\n}`;
};
export default genDiff;