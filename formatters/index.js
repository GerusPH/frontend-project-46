import stylish from './stylish.js';
import plain from './plain.js';

const formatter = (dif, formatType) => {
  if (formatType === 'plain') {
    return plain(dif);
  }
  return stylish(dif);
};
export default formatter;
