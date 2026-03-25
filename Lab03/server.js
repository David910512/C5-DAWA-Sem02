const http = require("http");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");

const PORT = 3000;

// Función helper para renderizar vistas
function renderView(res, viewName, data) {
    const filePath = path.join(__dirname, "views", viewName);
    fs.readFile(filePath, "utf8", (err, templateData) => {
        if (err) {
            res.statusCode = 500;
            res.end("Error interno del servidor");
            return;
        }
        const template = handlebars.compile(templateData);
        const html = template(data);
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.end(html);
    });
}

const server = http.createServer((req, res) => {

    if (req.url === "/") {
        renderView(res, "home.hbs", {
            title: "Servidor con Handlebars 🚀",
            welcomeMessage: "Bienvenido al laboratorio de Node.js",
            day: new Date().toLocaleDateString("es-PE"),
            students: ["Ana", "Luis", "Pedro", "David"],
        });

    } else if (req.url === "/about") {
        renderView(res, "about.hbs", {
            title: "Acerca del Curso",
            curso: "Desarrollo de Aplicaciones Web Avanzado",
            profesor: "Ricardo Coello Palomino",
            fecha: new Date().toLocaleDateString("es-PE"),
        });

    } else if (req.url === "/students") {
        renderView(res, "students.hbs", {
            title: "Estudiantes",
            students: [
                { nombre: "Ana",   nota: 18, destacado: true  },
                { nombre: "Luis",  nota: 14, destacado: false },
                { nombre: "Pedro", nota: 16, destacado: true  },
                { nombre: "María", nota: 12, destacado: false },
                { nombre: "David", nota: 19, destacado: true  },
            ]
        });

    } else {
        res.statusCode = 404;
        res.end("<h1>404 - Página no encontrada</h1>");
    }
});

server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});