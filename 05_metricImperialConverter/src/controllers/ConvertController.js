import {convert} from '../helpers/index.js'

class ConvertController {
    GET(request, response) {
	const convertObj = convert(request.query.get('input').toLowerCase())
	console.log(convertObj)
        response.writeHead(200, {'Content-Type': 'application/json'})
        response.end(JSON.stringify({error: 'converted'}))
    }
}

export default new ConvertController();
