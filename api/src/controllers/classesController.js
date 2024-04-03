const classesModel = require('../models/classesModel.js');

async function createClasses(data) {
    return await classesModel.createClasses(data);
}

async function getClasses(filters) {
    return await classesModel.getClasses(filters);
}

async function enroll(data) {
    return await classesModel.enroll(data);
}

async function getEnrollments(filters) {
    return await classesModel.getEnrollments(filters);
}

module.exports = { createClasses, getClasses, enroll, getEnrollments };
