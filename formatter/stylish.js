const indentation = (depth) => '  '.repeat(depth);

const stylish = (data) => {
  const iter = (array, depth) => {
    const formattedInfo = array.reduce((str, element) => {
      const [indent, key, entry] = element;
      const ent = Array.isArray(entry) ? `{\n${iter(entry, depth + 2)}${indentation(depth + 1)}}` : entry;
      const newStr = `${str}${indentation(depth)}${indent} ${key}: ${ent}\n`;
      return newStr;
    }, '');
    return formattedInfo;
  };
  return `{\n${iter(data, 1)}}`;
};

export default stylish;
