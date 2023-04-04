import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatter = (dif, formatType) => {
  if (formatType === 'plain') {
    return plain(dif);
  } if (formatType === 'json') {
    return json(dif);
  }
  return stylish(dif);
};
export default formatter;
