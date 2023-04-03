import _ from 'lodash';
import parser from './parsers.js';
import stylish from '../formatter/stylish.js';

const genDiff = (filePath1, filePath2) => {
  const firstFile = parser(filePath1);
  const secondFile = parser(filePath2);

  const findDefferences = (file1, file2) => {
    const allKeys = _.sortBy(_.union(Object.keys(file1), Object.keys(file2)));

    const iter = (data) => {
      if (!_.isObject(data)) {
        return data;
      }
      const entries = Object.keys(data)
        .reduce((array, key) => [...array, [' ', key, iter(data[key])]], []);
      return entries;
    };

    const differences = allKeys.reduce((arr, key) => {
      if (_.has(file1, key) && !_.has(file2, key)) {
        return [...arr, ['-', key, iter(file1[key])]];
      } if (!_.has(file1, key) && _.has(file2, key)) {
        return [...arr, ['+', key, iter(file2[key])]];
      }
      if (file1[key] === file2[key]) {
        return [...arr, [' ', key, file1[key]]];
      } if (_.isObject(file1[key]) && !_.isObject(file2[key])) {
        return [...arr, ['-', key, iter(file1[key])], ['+', key, file2[key]]];
      } if (!_.isObject(file1[key]) && _.isObject(file2[key])) {
        return [...arr, ['-', key, file1[key]], ['+', key, iter(file2[key])]];
      } if (_.isObject(file1[key]) && _.isObject(file2[key])) {
        return [...arr, [' ', key, findDefferences(file1[key], file2[key])]];
      }
      return [...arr, ['-', key, file1[key]], ['+', key, file2[key]]];
    }, []);
    return differences;
  };
  return stylish(findDefferences(firstFile, secondFile));
};

export default genDiff;
