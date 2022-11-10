import { Request, Response } from "express";
import { stripHtml } from 'string-strip-html';
import bcrypt from 'bcrypt';
import { v4 as uuid } from "uuid";
import { searchUser, insertNewUser, checkSession, insertNewSession, removeUser, searchUserBySession, changeUsername, getUserStats } from "../repositories/userRepository.js";

export async function createUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const username: string = stripHtml(req.body.username.trim()).result;
    const email: string = stripHtml(req.body.email.trim()).result;
    const password: string = stripHtml(req.body.password.trim()).result;
    const encryptedPassword: string = bcrypt.hashSync(password, 10);

    try {
        const emailExists = await searchUser(email);
        if (emailExists.rows[0]) { return res.sendStatus(409); }

        const body = {
            username,
            email,
            password: encryptedPassword
        }
        await insertNewUser(body);
        return res.sendStatus(201);

    } catch (err: unknown) {
        console.error(err);
        return res.sendStatus(500);
    }
}

export async function signInUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const email: string = stripHtml(req.body.email.trim()).result;
    const password: string = stripHtml(req.body.password.trim()).result;

    try {
        const user = await searchUser(email);
        if (!user.rows[0]) { return res.sendStatus(404); }

        const passwordCheck: boolean = bcrypt.compareSync(password, user.rows[0].password);

        if (user && passwordCheck) {
            const session = await checkSession(user.rows[0].email);

            if (session.rows[0]) {
                const body = {
                    token: session.rows[0].token,
                    username: user.rows[0].username,
                }
                return res.status(200).send(body);

            } else {
                const token: string = uuid();
                const body = {
                    userId: user.rows[0].id,
                    token
                }
                await insertNewSession(body);

                return res.status(200).send({
                    token
                });

            }
        } else {
            return res.sendStatus(401);
        }
    } catch (err: unknown) {
        console.error(err);
        return res.sendStatus(500);
    }
}

export async function updateUsername(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const password: string = stripHtml(req.body.password.trim()).result;
    const username: string = stripHtml(req.body.username.trim()).result;
    const { authorization } = req.headers;
    if (!authorization) { return res.sendStatus(401); }

    const token: string = stripHtml(authorization.replace('Bearer ', '')).result;

    try {
        const user = await searchUserBySession(token);
        if (!user.rows[0]) { return res.sendStatus(404); }

        const passwordCheck: boolean = bcrypt.compareSync(password, user.rows[0].password);

        if (user && passwordCheck) {
            await changeUsername(username, user.rows[0].email);
            return res.sendStatus(200);
        } else {
            return res.sendStatus(401);
        }

    } catch (err: unknown) {
        console.error(err);
        return res.sendStatus(500);
    }
}

export async function deleteUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const password: string = stripHtml(req.body.password.trim()).result;
    const { authorization } = req.headers;
    if (!authorization) { return res.sendStatus(401); }

    const token: string = stripHtml(authorization.replace('Bearer ', '')).result;

    try {
        const user = await searchUserBySession(token);
        if (!user.rows[0]) { return res.sendStatus(404); }

        const passwordCheck: boolean = bcrypt.compareSync(password, user.rows[0].password);

        if (user && passwordCheck) {
            await removeUser(user.rows[0].email);
            return res.sendStatus(204);
        } else {
            return res.sendStatus(401);
        }

    } catch (err: unknown) {
        console.error(err);
        return res.sendStatus(500);
    }
}

export async function userStats(req: Request, res: Response) {
    const { authorization } = req.headers;
    if (!authorization) { return res.sendStatus(401); }

    const token: string = stripHtml(authorization.replace('Bearer ', '')).result;

    try {
        const user = await searchUserBySession(token);
        if (!user.rows[0]) { return res.sendStatus(404); }

        const userInfo = await getUserStats(user.rows[0].email);
        return res.status(200).send(userInfo.rows[0]);

    } catch (err: unknown) {
        console.error(err);
        return res.sendStatus(500);
    }
}