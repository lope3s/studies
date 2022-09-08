import {convert} from '../../helpers/index.js';
import test from 'node:test';
import assert from 'node:assert';

test('Should return an error when no value is provided', (t) => {
	const input = 'gal'
	const expected = {error: 'No value provided'}
	const received = convert(input)	
	assert.deepStrictEqual(expected, received)
})

test('Should return an error when no unit is provided', (t) => {
	const input = '4'
	const expected = {error: 'No unit provided'}
	const received = convert(input)
	assert.deepStrictEqual(expected, received)
})

test("Should return an error if unit provided doesn't exists", (t) => {
	const input = '3asdf'
	const expected = {error: "Unit doesn't exists"}
	const received = convert(input)
	assert.deepStrictEqual(expected, received)
})

test('Should return the convert object with valid unit and integer value', (t) => {
	const input = '4gal'
	const expected = {
		"initNum": 4,
		"initUnit": "gal",
		"returnNum": 15.14164,
		"returnUnit": "l"
	}
	const received = convert(input)
	assert.deepStrictEqual(expected, received)
})

test('Should return the convert object with valid unit and float value', (t) => {
	const input = '4.5gal'
	const expected = {
		"initNum": 4.5,
		"initUnit": "gal",
		"returnNum": 17.034345000000002,
		"returnUnit": "l"
	}
	const received = convert(input)
	assert.deepStrictEqual(expected, received)
})
