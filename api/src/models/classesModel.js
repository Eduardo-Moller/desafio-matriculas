const { isEmpty } = require('../helpers/helpers');
const { insertUpdateTable, selectAllTable } = require('../helpers/sqlHelpers');
const { query } = require('../db/connect');

async function createClasses(data) {
    const classesResult = await insertUpdateTable('classes', data);

    if (isEmpty(classesResult)) return {};

    return classesResult;
}

async function getClasses(filters) {
    filters.deleted = false;
    const classesResult = await selectAllTable('classes', filters);

    if (isEmpty(classesResult)) return {};

    return classesResult;
}

async function enroll(data) {
    const resultClassesStudents = [];

    data.rows.forEach((value) => {
        resultClassesStudents.push(insertUpdateTable('classes_students', { classes_id: value.id, users_id: data.user.id }));
    });

    await insertUpdateTable('users', { id: data.user.id, enrolled: true });

    return resultClassesStudents;
}

async function getEnrollments(filters) {
    const sql = `
        SELECT
            classes_students.id,
            users.name as teacher_name,
            subjects.name as subject_name,
            classes.schedule,
            classes.students_limit,
            classes.begin_time,
            classes.end_time,
            classes.day,
            classes.name as class_name
        FROM
            public.classes_students
        INNER JOIN public.classes ON classes_students.classes_id = classes.id
        INNER JOIN public.subjects ON classes.subjects_id = subjects.id
        INNER JOIN public.users ON classes.teacher_id = users.id
        WHERE
            classes_students.users_id = ${filters.users_id} ORDER BY classes.day ASC, classes.begin_time ASC`;
    const resultEnrollments = await query(sql);

    return resultEnrollments;
}

module.exports = { createClasses, getClasses, enroll, getEnrollments };
