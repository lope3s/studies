import ConvertController from '../controllers/index.js'

class Routes {
    constructor (method) {
        this.method = method
    }

    '/convert' = () => ConvertController[this.method]

    error404 (response) {
        response.writeHead(404, {'Content-Type': 'application/json'})
        response.end(JSON.stringify({error: 'route not found'}))
    }
}

export default Routes