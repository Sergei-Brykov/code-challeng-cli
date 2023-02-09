import { NotValidRow } from "../exceptions/NotValidRow";
import { Table } from "./Table";

describe("Table constructor throw Error when table data is incorrect", () => {
	const array_3_item = Array(3).fill(0);
	const array_7_item = Array(7).fill(0);
	try {
		new Table(array_3_item);
	} catch (e) {
		expect(e).toBeInstanceOf(NotValidRow);
	}
	try {
		new Table(array_7_item);
	} catch (e) {
		expect(e).toBeInstanceOf(NotValidRow);
	}
});

describe("Create table correctly", () => {
	it(`[1,2,3,4] => [[1,2], [3,4]] `, () => {
		const table = new Table([1, 2, 3, 4]);
		expect(table.table).toEqual([
			[1, 2],
			[3, 4],
		]);
		expect(table.edgeLength).toBe(2);
		expect(table.numberOfInternalPerimeters).toBe(1);
	});
	it(`[1,2,3,4,5,6,7,8,9] => [[1,2,3], [4,5,6], [7,8,9]] `, () => {
		const table = new Table([1, 2, 3, 4, 5, 6, 7, 8, 9]);
		expect(table.table).toEqual([
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
		]);

		expect(table.edgeLength).toBe(3);
		expect(table.numberOfInternalPerimeters).toBe(1);
	});

	it(`Array from 25 item`, () => {
		const table = new Table(
			Array(25)
				.fill(null)
				.map((_, index) => ++index)
		);
		expect(table.table).toEqual([
			[1, 2, 3, 4, 5],
			[6, 7, 8, 9, 10],
			[11, 12, 13, 14, 15],
			[16, 17, 18, 19, 20],
			[21, 22, 23, 24, 25],
		]);

		expect(table.edgeLength).toBe(5);
		expect(table.numberOfInternalPerimeters).toBe(2);
	});
});
describe("Rotate table correctly", () => {
	it(`[1,2] => [3,1]
      [3,4] => [4,2]`, () => {
		const table = new Table([1, 2, 3, 4]);
		table.rotate();
		expect(table.table).toEqual([
			[3, 1],
			[4, 2],
		]);
	});
	it(`[1,2,3] => [4,1,2]
      [4,5,6] => [7,5,3]
      [7,8,9] => [8,9,6]
      `, () => {
		const table = new Table([1, 2, 3, 4, 5, 6, 7, 8, 9]);
		table.rotate();
		expect(table.table).toEqual([
			[4, 1, 2],
			[7, 5, 3],
			[8, 9, 6],
		]);

		expect(table.edgeLength).toBe(3);
		expect(table.numberOfInternalPerimeters).toBe(1);
	});

	it(`Rotate 25 item`, () => {
		const table = new Table(
			Array(25)
				.fill(null)
				.map((_, index) => ++index)
		);
		table.rotate();
		expect(table.table).toEqual([
			[6, 1, 2, 3, 4],
			[11, 12, 7, 8, 5],
			[16, 17, 13, 9, 10],
			[21, 18, 19, 14, 15],
			[22, 23, 24, 25, 20],
		]);
	});
});

describe("Table return right serializing data", () => {
	it(`return right data`, () => {
		const arr = Array(25)
			.fill(null)
			.map((_, index) => ++index);

		const table = new Table(arr);

		expect(table.toArray()).toEqual(arr);
	});

	it(`return right data after rotation`, () => {
		const arr = Array(25)
			.fill(null)
			.map((_, index) => ++index);

		const expectedArray = [
			[6, 1, 2, 3, 4],
			[11, 12, 7, 8, 5],
			[16, 17, 13, 9, 10],
			[21, 18, 19, 14, 15],
			[22, 23, 24, 25, 20],
		].flat();

		const table = new Table(arr);
		table.rotate();
		expect(table.toArray()).toEqual(expectedArray);
	});
});

describe("Rotate in counter clockwise", () => {
	it(`[1,2] => [2,4]
      [3,4] => [1,3]`, () => {
		const table = new Table([1, 2, 3, 4]);

		table.rotate("counter-clockwise");

		expect(table.table).toEqual([
			[2, 4],
			[1, 3],
		]);
	});

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
});
