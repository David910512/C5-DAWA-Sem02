let students = [
    {
        id: 1,
        name: "Juan Pérez",
        grade: 20,
        age: 23,
        email: "juan.perez@ejemplo.com",
        phone: "+51 987654321",
        enrollmentNumber: "2025001",
        course: "Diseño y Desarrollo de Software C24",
        year: 3,
        subjects: ["Algoritmos", "Bases de Datos", "Redes"],
        gpa: 3.8,
        status: "Activo",
        admissionDate: "2022-03-01"
    },
    {
        id: 2,
        name: "Ana Torres",
        grade: 16,
        age: 21,
        email: "ana.torres@ejemplo.com",
        phone: "+51 912345678",
        enrollmentNumber: "2025002",
        course: "Diseño y Desarrollo de Software C24",
        year: 2,
        subjects: ["Algoritmos", "Bases de Datos"],
        gpa: 3.2,
        status: "Inactivo",
        admissionDate: "2023-03-01"
    },
    {
        id: 3,
        name: "Pedro Ruiz",
        grade: 14,
        age: 22,
        email: "pedro.ruiz@ejemplo.com",
        phone: "+51 998765432",
        enrollmentNumber: "2025003",
        course: "Diseño y Desarrollo de Software C24",
        year: 1,
        subjects: ["Algoritmos"],
        gpa: 2.8,
        status: "Activo",
        admissionDate: "2024-03-01"
    }
];

function getAll() {
    return students;
}

function getById(id) {
    return students.find(s => s.id === id);
}

function create(student) {
    student.id = students.length + 1;
    students.push(student);
    return student;
}

function update(id, updateData) {
    const index = students.findIndex(s => s.id === id);
    if (index !== -1) {
        students[index] = { ...students[index], ...updateData };
        return students[index];
    }
    return null;
}

function remove(id) {
    const index = students.findIndex(s => s.id === id);
    if (index !== -1) {
        return students.splice(index, 1)[0];
    }
    return null;
}

function listByStatus(status) {
    return students.filter(s => s.status.toLowerCase() === status.toLowerCase());
}

function listByGrade(minGrade, maxGrade) {
    return students.filter(s => s.grade >= minGrade && s.grade <= maxGrade);
}

module.exports = { getAll, getById, create, update, remove, listByStatus, listByGrade };