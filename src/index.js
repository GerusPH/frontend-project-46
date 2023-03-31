import _ from 'lodash';
import parser from './parsers.js';

const genDiff = (firstPath, secondPath) => {
  const file1 = parser(firstPath);
  const file2 = parser(secondPath);
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
