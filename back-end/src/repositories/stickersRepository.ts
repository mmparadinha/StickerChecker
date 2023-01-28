import connection from "../database/database";

export default async function findStickers() {
    return connection.query(`
        SELECT * FROM stickers
    ;`, [])
}