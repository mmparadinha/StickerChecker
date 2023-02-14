import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authenticationMiddleware";
import bcrypt from 'bcrypt';
import { v4 as uuid } from "uuid";
import { searchUser, insertNewUser, checkSession, insertNewSession, removeUser, searchUserBySession, changeUsername, getUserOwnedStatus } from "../repositories/userRepository";

//TODO - sanitização HTML
//TODO - trocar uuid por jwt

export async function createUser(req: Request, res: Response) {
    const username: string = req.body.username.trim();
    const email: string = req.body.email.trim();
    const password: string = req.body.password.trim();

    try {
        const emailExists = await searchUser(email);
        if (emailExists) {
            res.sendStatus(409);
            return;
        }

        const encryptedPassword: string = bcrypt.hashSync(password, 10);

        const body = {
            username,
            email,
            password: encryptedPassword
        }
        await insertNewUser(body);
        res.sendStatus(201);
        return;

    } catch (err: unknown) {
        console.error(err);
        res.sendStatus(500);
        return;
    }
}

export async function signInUser(req: Request, res: Response) {
    const email: string = req.body.email.trim();
    const password: string = req.body.password.trim();

    try {
        const user = await searchUser(email);
        if (!user) {
            res.sendStatus(404);
            return;
        }

        const passwordCheck: boolean = bcrypt.compareSync(password, user.password);

        if (user && passwordCheck) {
            const session = await checkSession(user.id);

            if (session) {
                res.status(200).send({
                    token: session.token,
                    username: user.username,
                    userId: user.id
                });
                return;

            } else {
                const token: string = uuid();

                await insertNewSession({
                    userId: user.id,
                    token
                });

                res.status(200).send({
                    token,
                    username: user.username,
                    userId: user.id
                });
                return;
            }

        } else {
            res.sendStatus(401);
            return;
        }
    } catch (err: unknown) {
        console.error(err);
        res.sendStatus(500);
        return;
    }
}

export async function updateUsername(req: AuthenticatedRequest, res: Response) {
    const password: string = req.body.password.trim();
    const username: string = req.body.username.trim();
    const { authorization } = req.headers;
    if (!authorization) {
        res.sendStatus(401);
        return;
    }

    const token: string = authorization.replace('Bearer ', '');

    try {
        const session = await searchUserBySession(token);
        if (!session) {
            res.sendStatus(404);
            return;
        }

        const passwordCheck: boolean = bcrypt.compareSync(password, session.users.password);

        if (session && passwordCheck) {
            await changeUsername(username, session.users.email);
            res.sendStatus(200);
            return;
        } else {
            res.sendStatus(401);
            return;
        }
    } catch (err: unknown) {
        console.error(err);
        res.sendStatus(500);
        return;
    }
}

export async function deleteUser(req: AuthenticatedRequest, res: Response) {
    const password: string = req.body.password.trim();
    const { authorization } = req.headers;
    if (!authorization) {
        res.sendStatus(401);
        return;
    }

    const token: string = authorization.replace('Bearer ', '');

    try {
        const session = await searchUserBySession(token);
        if (!session) {
            res.sendStatus(404);
            return;
        }

        const passwordCheck: boolean = bcrypt.compareSync(password, session.users.password);

        if (session && passwordCheck) {
            await removeUser(session.users.email);
            res.sendStatus(204);
            return;
        } else {
            res.sendStatus(401);
            return;
        }
    } catch (err: unknown) {
        console.error(err);
        res.sendStatus(500);
        return;
    }
}

export async function userStatus(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { authorization } = req.headers;
    if (!authorization) {
        res.sendStatus(401);
        return;
    } 

    const token: string = authorization.replace('Bearer ', '');

    try {
        const session = await searchUserBySession(token);
        if (!session) {
            res.sendStatus(404);
            return;
        }

        const ownedAmount = await getUserOwnedStatus(userId);
        res.status(200).send({
            ownedAmount
        });
        return;

    } catch (err: unknown) {
        console.error(err);
        res.sendStatus(500);
        return;
    }
}