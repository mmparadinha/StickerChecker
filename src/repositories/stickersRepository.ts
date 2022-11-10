import connection from "../database/database.js";

export default async function searchUserStickers() {
    return connection.query(`

    ;`, [])
}