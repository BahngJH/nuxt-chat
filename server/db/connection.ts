import mysql from 'mysql2/promise';

interface Options {
    query: string;
    values?: any[];
}

const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dhsfkdls00',
    database: 'nuxt_chatting',
});

export const sql = async ({ query, values }: Options) => {
    const [rows] = await (await pool).query(query, values);

    return rows;
};