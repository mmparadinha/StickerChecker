import prisma from "../database/database";
import { QueryResult } from "pg";
import { UserEntity, User } from "../protocols/User";
import { SessionEntity, Session } from "../protocols/Session";

//conferir o retorno de cada modificação via prisma para tipar pelo TS

export async function searchUser(email: string): Promise<User> {
    return prisma.users.findUnique({
        where: {
            email
        }
    });
}

export async function searchUserBySession(token: string): Promise<(User & {sessions: Session[];})[]> {
    return prisma.users.findMany({
        include: {
            sessions: {
                where: {
                    token
                }
            }
        }
    });
}

export async function insertNewUser(newUser: User) {
    return prisma.users.create({
        data: {
            username: newUser.username,
            email: newUser.email,
            password: newUser.password
        }
    });
}

export async function checkSession(userId: number) {
    return prisma.sessions.findMany({
        where: {
            userId
        }
    });
}

export async function insertNewSession(newSession: Session) {
    return prisma.sessions.create({
        data: {
            userId: newSession.userId,
            token: newSession.token
        }
    });
}

export async function removeUser(email: string) {
    return prisma.users.delete({
        where: {
            email
        }
    });
}

export async function changeUsername(username: string, email: string) {
    return prisma.users.update({
        where: {
            email
        },
        data: {
            username
        }
    });
}

export async function getUserStats(userId: number) {
    return prisma.userStickers.count({
        where: {
            userId
        }
    });
}

export async function getUsers() {
    return prisma.users.findMany();
}