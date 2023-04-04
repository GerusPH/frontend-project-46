import _ from 'lodash';
import parser from './parsers.js';
import formatter from '../formatters/index.js';

const genDiff = (filePath1, filePath2, formatType = 'stylish') => {
  const firstFile = parser(filePath1);
  const secondFile = parser(filePath2);

  const findDifferences = (file1, file2) => {
    const allKeys = _.sortBy(_.union(Object.keys(file1), Object.keys(file2)));

    const differences = allKeys.map((key) => {
      if (_.has(file1, key) && !_.has(file2, key)) {
        return { name: key, value: file1[key], status: 'removed' };
      } if (!_.has(file1, key) && _.has(file2, key)) {
        return { name: key, value: file2[key], status: 'added' };
      }
      if (file1[key] === file2[key]) {
        return { name: key, value: file1[key], status: 'unchanged' };
      } if (_.isObject(file1[key]) && _.isObject(file2[key])) {
        return { name: key, value: findDifferences(file1[key], file2[key]), status: 'nested' };
      }
      return {
        name: key, oldValue: file1[key], value: file2[key], status: 'updated',
      };
    });
    return differences;
  };
  return formatter(findDifferences(firstFile, secondFile), formatType);
};

export default genDiff;
