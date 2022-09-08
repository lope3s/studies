const convertValues = {
	'gal':{value: 3.78541, sisUnit: 'l'},
	'lbs': {value: 0.453592, sisUnit: 'kg'},
	'mi': {value: 1.60934, sisUnit: 'km'},
	'l': {value: 0.26417, sisUnit: 'gal'},
	'kg': {value: 2.20462, sisUnit: 'lbs'},
	'km': {value: 0.621372, sisUnit: 'mi'}
}

function convert(input) {
	const number = parseFloat(input.replace(/[a-z]/g, ''))
	const unit = input.replace(/[0-9.]/g, '')
	const property = convertValues[unit]
	
	if (!number) return {error: 'No value provided'}

	if (!unit) return {error: 'No unit provided'}

	if (!property) return {error: "Unit doesn't exists"}

	return {
		initNum: number,
		initUnit: unit,
		returnNum: property.value * number,
		returnUnit: property.sisUnit
	}
		
	
}

export default convert;
