const http = require('http')

const servidor = http.createServer((req, res) => {
    //console.log(req.url)
    //console.log(req.method)
    //console.log(req.headers)

    console.log(res)

    res.end('Creando servidor')
})

const port = 3000;

servidor.listen(port, () => {
    console.log('servidor ejecutandose en el puerto', port);
})