const https = require('https');

const options = {
    hostname: 'reqres.in',
    path: '/api/users',
    method: 'GET',
    headers: {
        'x-api-key': 'reqres_57f83e5b07a2451a8122a647db3ac97f'
    },
};

const req = https.request(options, (res) => {
    let data = "";

    // Recibir los fragmentos de datos
    res.on('data', (chunk) => {
        data += chunk;
    });

    // Una vez que todos los datos han sido recibidos
    res.on('end', () => {
        console.log(JSON.parse(data));
    });
});

// Manejar errores
req.on('error', (error) => {
    console.error(`Error en la solicitud: ${error.message}`);
});

// Finalizar la solicitud
req.end();