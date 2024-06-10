const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'survey_db',
    password: 'naman',
    port: 5432,
});

module.exports = pool;
