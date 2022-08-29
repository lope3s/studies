class ConvertController {
    GET(request, response) {
        console.log('convert')

        response.writeHead(200, {'Content-Type': 'application/json'})
        response.end(JSON.stringify({error: 'converted'}))
    }
}

export default new ConvertController();