import connection from "../database/database.js";
import { QueryResult } from "pg";
import { User, UserEntity } from "../protocols/User.js";
import { Session, SessionEntity } from "../protocols/Session.js";

export async function searchUser(email: string): Promise<QueryResult<UserEntity>> {
    return connection.query(`
        SELECT * FROM users WHERE users.email=$1
    ;`, [email])
}

export async function searchUserBySession(token: string): Promise<QueryResult<UserEntity>> {
    return connection.query(`
        SELECT
            users.*
        FROM users
        JOIN sessions ON users.id=sessions."userId"
        WHERE sessions.token=$1
    ;`, [token])
}

export async function insertNewUser(newUser: User): Promise<QueryResult<UserEntity>> {
    return connection.query(`
        INSERT INTO users (username, email, password) VALUES ($1, $2, $3)
    ;`, [newUser.username, newUser.email, newUser.password])
}

export async function checkSession(email: string): Promise<QueryResult<SessionEntity>> {
    return connection.query(`
        SELECT
            sessions.*
        FROM sessions
        JOIN users ON sessions."userId"=users.id
        WHERE users.email=$1
    ;`, [email]);
}

export async function insertNewSession(newSession: Session): Promise<QueryResult<SessionEntity>> {
    return connection.query(`
        INSERT INTO sessions ("userId", token) VALUES ($1, $2)
    ;`, [newSession.userId, newSession.token]);
}

export async function removeUser(email: string): Promise<QueryResult> {
    return connection.query(`
        DELETE FROM users WHERE users.email=$1
    ;`, [email]);
}

export async function changeUsername(username: string, email: string): Promise<QueryResult> {
    return connection.query(`
        UPDATE users SET username=$1 WHERE users.email=$2
    ;`, [username, email]);
}

export async function getUserStats(email: string): Promise<QueryResult<Number>> {
    return connection.query(`
        SELECT
            COUNT("stickerId") as "ownedStickers"
        FROM "userStickers"
        JOIN users ON "userStickers"."userId"=users.id
        WHERE users.email=$1
    ;`, [email]);
}