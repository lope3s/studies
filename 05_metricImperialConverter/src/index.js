import http from 'node:http';
import routes from './routes/index.js';

function handler (request, response) {
    const method = request.method
    const url = new URL(request.url, `http://${request.headers.host}`)
    request.query = url.searchParams

    const route = routes[url.pathname]

    route ? route[method](request, response) : routes.error(response)
}

const server = http.createServer(handler)

server.listen(3000, () => {
    console.log('Listening on http://localhost:3000')
})
