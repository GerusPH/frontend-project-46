#!/usr/bin/env node
import { Command } from 'commander/esm.mjs'
const program = new Command();
import { program } from 'commander';
import genDiff from '../src/index.js';

program
.version('0.0.1', '-V, --version', 'output the version number')
.description('Compares two configuration files and shows a difference')

.option('-f, --format <type>', 'output format')
.argument('filepath1')
.argument('filepath2')

program.parse();
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2));
  })
  .parse();