# Code challenge CLI

## Requirements

Before running this project, you need to have the following:

- `Node.js` >= `v16.00`
- `npm` >= `v8.00`

## Build

first you need to build it:

1. Run `npm install` to install dependencies.
2. Run `npm run build` to build TS code.

## Start

!!! Only before build!!!!

```bash
  node build/cli.js input.csv > output.csv
```

## Dev mode

if you want to develop this code just run

```bash
  npm run dev
```

You see result in console
if you want to put result in the some file you can run:

```bash
  npm run dev output.csv
```

## Tests

start testing:

```bash
  npm run test
```

## Table Class

In the table class, it is also possible to rotate the table counterclockwise - there is also a unit test for this functionality, although it is not used anywhere

```tsx
it(`[1,2,3] => [2,3,6]
    [4,5,6] => [1,5,9]
    [7,8,9] => [4,7,8]
    `, () => {
	const table = new Table([1, 2, 3, 4, 5, 6, 7, 8, 9]);

	table.rotate("counter-clockwise");

	expect(table.table).toEqual([
		[2, 3, 6],
		[1, 5, 9],
		[4, 7, 8],
	]);
});
```
