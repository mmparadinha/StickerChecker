import prisma from "../database/database";
import { UserEntity, User } from "../protocols/User";
import { SessionEntity, Session } from "../protocols/Session";

export async function searchUser(email: string): Promise<UserEntity> {
    return prisma.users.findUnique({
        where: {
            email
        }
    });
}

//conferir o retorno de cada modificação via prisma para tipar pelo TS
export async function searchUserBySession(token: string) {
    return prisma.sessions.findFirst({
        where: {
            token
        },
        include: {
            users: true
        }
    });
}

export async function insertNewUser(newUser: User): Promise<UserEntity> {
    return prisma.users.create({
        data: {
            username: newUser.username,
            email: newUser.email,
            password: newUser.password
        }
    });
}

export async function checkSession(userId: number): Promise<SessionEntity> {
    return prisma.sessions.findFirst({
        where: {
            userId
        }
    });
}

export async function insertNewSession(newSession: Session): Promise<SessionEntity> {
    return prisma.sessions.create({
        data: {
            userId: newSession.userId,
            token: newSession.token
        }
    });
}

//conferir o retorno de cada modificação via prisma para tipar pelo TS
export async function removeUser(email: string) {
    return prisma.users.delete({
        where: {
            email
        }
    });
}

//conferir o retorno de cada modificação via prisma para tipar pelo TS
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

export async function getUserOwnedStatus(userId: number): Promise<number> {
    return prisma.userStickers.count({
        where: {
            userId,
            amount: {
                gt: 0
            }
        }
    });
}
