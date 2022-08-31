const convertValues = {
	'gal':{value: 3.78541, sisUnit: 'l'},
	'lbs': {value: 0.453592, sisUnit: 'kg'},
	'mi': {value: 1.60934, sisUnit: 'km'},
	'l': {value: 0.26417, sisUnit: 'gal'},
	'kg': {value: 2.20462, sisUnit: 'lbs'},
	'km': {value: 0.621372, sisUnit: 'mi'}
}

function convert(input) {
	const number = parseInt( input.replace(/[a-z]/g, ''))
	const unit = input.replace(/[0-9]/g, '')

	return {
		initNum: number,
		initUnit: unit,
		returnNum: convertValues[unit].value * number,
		returnUnit: convertValues[unit].sisUnit
	}
		
	
}

export default convert;
