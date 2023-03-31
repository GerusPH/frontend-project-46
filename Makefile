install:
	npm ci

gendiff -h:
	node bin/gendiff.js

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npx test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

jest:
	npx jest