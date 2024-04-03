const { query } = require('../db/connect');
const { isEmpty } = require('./helpers');

/**
 * Função que insere ou atualiza registros em uma tabela do banco de dados.
 * Verifica se o objeto de dados possui um campo 'id':
 *   - Se 'id' estiver presente, realiza uma atualização na tabela com os valores fornecidos.
 *   - Se 'id' não estiver presente, insere um novo registro na tabela com os valores fornecidos.
 * @param {string} table O nome da tabela onde os dados serão inseridos ou atualizados.
 * @param {Object} data Um objeto contendo os campos e valores a serem inseridos ou atualizados na tabela.
 * @returns {Promise} Uma promessa que será resolvida com o resultado da operação de inserção ou atualização.
 */
async function insertUpdateTable(table, data) {
    const fields = Object.keys(data);
    const values = Object.values(data);

    let sql;

    if (fields.includes('id')) {
        const idIndex = fields.indexOf('id');
        const id = values[idIndex];

        const checkField = await selectTable(table, { id });
        if (table) table = 'public.' + table;
        if (!checkField) return {};
        if (checkField && checkField.updated) {
            fields.push('updated');
            values.push('NOW()');
        }
        fields.splice(idIndex, 1);
        values.splice(idIndex, 1);

        const updates = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');
        sql = `UPDATE ${table} SET ${updates} WHERE id = $${fields.length + 1} RETURNING *`;
        values.push(id);
    } else {
        if (table) table = 'public.' + table;
        const placeholders = values.map((value, index) => `$${index + 1}`).join(', ');
        sql = `INSERT INTO ${table} (${fields.join(', ')}) VALUES (${placeholders}) RETURNING *`;
    }

    return (await query(sql, values))[0];
}

/**
 * Função que realiza uma consulta para selecionar um único registro de uma tabela do banco de dados, com base nos filtros fornecidos.
 * Constrói uma consulta SQL dinâmica com base nos campos e valores dos filtros.
 * @param {string} table O nome da tabela onde a consulta será realizada.
 * @param {Object} filters Um objeto contendo os campos e valores a serem usados como filtros na consulta.
 * @returns {Promise} Uma promessa que será resolvida com o resultado da consulta.
 */
async function selectTable(table, filters) {
    if (table) table = 'public.' + table;
    const fields = Object.keys(filters);
    const values = Object.values(filters);

    if (!table || !fields.length || !values.length) return {};

    const where = fields.map((field, index) => `${field} = $${index + 1}`).join(' AND ');
    const sql = `SELECT * FROM ${table} WHERE ${where} LIMIT 1`;

    return (await query(sql, values))[0];
}

/**
 * Função que realiza uma consulta para selecionar todos os registros de uma tabela do banco de dados, com base nos filtros fornecidos.
 * Constrói uma consulta SQL dinâmica com base nos campos e valores dos filtros.
 * @param {string} table O nome da tabela onde a consulta será realizada.
 * @param {Object} filters Um objeto contendo os campos e valores a serem usados como filtros na consulta.
 * @param {string} columns Uma string representando os nomes das colunas a serem selecionadas. Padrão é '*' (todas as colunas).
 * @param {Array} order Um array contendo os nomes dos campos pelos quais os resultados devem ser ordenados.
 * @returns {Promise} Uma promessa que será resolvida com o resultado da consulta.
 */
async function selectAllTable(table, filters, columns = '*', order = []) {
    if (!table) return [];
    if (table) table = 'public.' + table;
    if (isEmpty(filters)) return await query(`SELECT ${columns} FROM ${table}` + (order.length > 0 ? ` ORDER BY ${order.join(', ')}` : ''));
    const fields = Object.keys(filters);
    const values = Object.values(filters);

    let sql;

    if (table && (fields.length == 0 || values.length == 0)) {
        sql = `SELECT ${columns} FROM ${table}`;
    } else {
        const where = fields.map((field, index) => `${field} = $${index + 1}`).join(' AND ');
        sql = `SELECT ${columns} FROM ${table} WHERE ${where}`;
    }

    if (order.length > 0) {
        sql += ` ORDER BY ${order.join(', ')}`;
    }

    return await query(sql, values);
}

module.exports = { insertUpdateTable, selectTable, selectAllTable };
