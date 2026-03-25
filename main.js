const http = require("http");
const repo = require("./repository/studentsRepository");

const PORT = 4000;

// Validación de campos requeridos
function validate(student) {
    const errors = [];
    if (!student.name)   errors.push("El nombre es requerido");
    if (!student.email)  errors.push("El correo es requerido");
    if (!student.course) errors.push("La carrera es requerida");
    if (!student.phone)  errors.push("El celular es requerido");
    return errors;
}

// Helper para leer el body
function getBody(req) {
    return new Promise((resolve) => {
        let body = "";
        req.on("data", chunk => (body += chunk));
        req.on("end", () => resolve(JSON.parse(body)));
    });
}

const server = http.createServer(async (req, res) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    const { method, url } = req;

    // GET /students
    if (url === "/students" && method === "GET") {
        res.statusCode = 200;
        res.end(JSON.stringify(repo.getAll()));
    }

    // GET /students/:id
    else if (url.startsWith("/students/") && method === "GET") {
        const id = parseInt(url.split("/")[2]);
        const student = repo.getById(id);
        if (student) {
            res.statusCode = 200;
            res.end(JSON.stringify(student));
        } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: "Estudiante no encontrado" }));
        }
    }

    // POST /students
    else if (url === "/students" && method === "POST") {
        const body = await getBody(req);
        const errors = validate(body);
        if (errors.length > 0) {
            res.statusCode = 400;
            res.end(JSON.stringify({ errors }));
            return;
        }
        const newStudent = repo.create(body);
        res.statusCode = 201;
        res.end(JSON.stringify(newStudent));
    }

    // PUT /students/:id
    else if (url.startsWith("/students/") && method === "PUT") {
        const id = parseInt(url.split("/")[2]);
        const body = await getBody(req);
        const updated = repo.update(id, body);
        if (updated) {
            res.statusCode = 200;
            res.end(JSON.stringify(updated));
        } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: "Estudiante no encontrado" }));
        }
    }

    // DELETE /students/:id
    else if (url.startsWith("/students/") && method === "DELETE") {
        const id = parseInt(url.split("/")[2]);
        const deleted = repo.remove(id);
        if (deleted) {
            res.statusCode = 200;
            res.end(JSON.stringify(deleted));
        } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: "Estudiante no encontrado" }));
        }
    }

    // POST /ListByStatus
    else if (url === "/ListByStatus" && method === "POST") {
        const body = await getBody(req);
        if (!body.status) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: "El campo status es requerido" }));
            return;
        }
        const result = repo.listByStatus(body.status);
        res.statusCode = 200;
        res.end(JSON.stringify(result));
    }

    // POST /ListByGrade
    else if (url === "/ListByGrade" && method === "POST") {
        const body = await getBody(req);
        if (body.minGrade === undefined || body.maxGrade === undefined) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: "Los campos minGrade y maxGrade son requeridos" }));
            return;
        }
        const result = repo.listByGrade(body.minGrade, body.maxGrade);
        res.statusCode = 200;
        res.end(JSON.stringify(result));
    }

    // Ruta no encontrada
    else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: "Ruta no encontrada" }));
    }
});

server.listen(PORT, () => {
    console.log(`API corriendo en http://localhost:${PORT}`);
});