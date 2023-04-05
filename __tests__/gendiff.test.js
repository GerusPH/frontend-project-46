import { test, expect } from '@jest/globals';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
import nestedDiff from '../__fixtures__/nestedDiff.js';
import plainDiff from '../__fixtures__/plainDiff.js';

const jsonDiff = JSON.stringify(JSON.parse(fs.readFileSync('__fixtures__/jsonDiff.json', 'utf8')));
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

test('test1 - nestedJsonStylish', () => {
  expect(genDiff(getFixturePath('nested1.json'), getFixturePath('nested2.json'))).toEqual(nestedDiff);
});
test('test2 - nestedYmlStylish', () => {
  expect(genDiff(getFixturePath('nested1.yml'), getFixturePath('nested2.yml'))).toEqual(nestedDiff);
});
test('test3 - nestedYmlPlain', () => {
  expect(genDiff(getFixturePath('nested1.yml'), getFixturePath('nested2.yml'), 'plain')).toEqual(plainDiff);
});
test('test4 - nestedJsonStylish', () => {
  expect(genDiff(getFixturePath('nested1.json'), getFixturePath('nested2.json'), 'plain')).toEqual(plainDiff);
});
test('test5 - nestedJson', () => {
  expect(genDiff(getFixturePath('nested1.json'), getFixturePath('nested2.json'), 'json')).toEqual(jsonDiff);
});
