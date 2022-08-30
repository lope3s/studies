import {ConvertController} from '../controllers/index.js'

const routes = {
    '/convert': ConvertController,
    error: function error404 (response) {
        response.writeHead(404, {'Content-Type': 'application/json'})
        response.end(JSON.stringify({error: 'route not found'}))
    }
}

export default routes

