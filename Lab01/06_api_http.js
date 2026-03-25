const http = require('http')
const {alumno} = require('./alumno')

const server = http.createServer((req, res) => {
    const ruta = req.url;

    if (ruta == '/') {
        return res.end('Bienvenido a las API')
    }

    if (ruta == '/alumno') {
        res.setHeader('content-type', 'application/json')
        return res.end(JSON.stringify(alumno, null, 2))  // 👈 solo aquí cambia
    }

    res.statusCode = 404;
    res.end('recurso no encontrado')
})

server.listen(3000, () => {
    console.log('Servidor conectado')
})