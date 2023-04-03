import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
import nestedDiff from '../__fixtures__/nestedDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

test('test1 - nestedJson', () => {
  expect(genDiff(getFixturePath('nested1.json'), getFixturePath('nested2.json'))).toEqual(nestedDiff);
});
test('test2 - nestedYml', () => {
  expect(genDiff(getFixturePath('nested1.yml'), getFixturePath('nested2.yml'))).toEqual(nestedDiff);
});
