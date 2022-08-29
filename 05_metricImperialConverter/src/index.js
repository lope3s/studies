import http from 'node:http';

import Routes from './routes/index.js';

function handler (request, response) {
    const method = request.method
    const url = new URL(request.url, `http://${request.headers.host}`)

    const routes = new Routes(method)

    routes[url.pathname] ? routes[url.pathname](request, response) : routes.error404(response)
}

const server = http.createServer(handler)

server.listen(3000, () => {
    console.log('Listening on http://localhost:3000')
})