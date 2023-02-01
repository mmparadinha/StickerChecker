import { Request, Response } from "express";
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
            console.log(session)

            if (session) {
                res.status(200).send({
                    token: session.token,
                    username: user.username
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
                    username: user.username
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

//função fechada para manutenção rsrs - erro no método de busca do prisma via session
export async function updateUsername(req: Request, res: Response) {
    const password: string = req.body.password.trim();
    const username: string = req.body.username.trim();
    const { authorization } = req.headers;
    if (!authorization) {
        res.sendStatus(401);
        return;
    }

    const token: string = authorization.replace('Bearer ', '');

    try {
        const user = await searchUserBySession(token);
        console.log(user)
        // if (!user) {
        //     res.sendStatus(404);
        //     return;
        // }

        // const passwordCheck: boolean = bcrypt.compareSync(password, user.password);

        // if (user && passwordCheck) {
        //     await changeUsername(username, user.email);
        //     res.sendStatus(200);
        //     return;
        // } else {
        //     res.sendStatus(401);
        //     return;
        // }
res.sendStatus(303)
    } catch (err: unknown) {
        console.error(err);
        res.sendStatus(500);
        return;
    }
}

//função fechada para manutenção rsrs - erro no método de busca do prisma via session
export async function deleteUser(req: Request, res: Response) {
    const password: string = req.body.password.trim();
    const { authorization } = req.headers;
    if (!authorization) {
        res.sendStatus(401);
        return;
    }

    const token: string = authorization.replace('Bearer ', '');

    try {
        const user = await searchUserBySession(token);
    console.log(user)
    //     if (!user.rows[0]) {
    //         res.sendStatus(404);
    //         return;
    //     }

    //     const passwordCheck: boolean = bcrypt.compareSync(password, user.rows[0].password);

    //     if (user && passwordCheck) {
    //         await removeUser(user.rows[0].email);
    //         res.sendStatus(204);
    //         return;
    //     } else {
    //         res.sendStatus(401);
    //         return;
    //     }
res.sendStatus(303)
    } catch (err: unknown) {
        console.error(err);
        res.sendStatus(500);
        return;
    }
}

//função fechada para manutenção rsrs - erro no método de busca do prisma via session
export async function userStatus(req: Request, res: Response) {
    const { authorization } = req.headers;
    if (!authorization) {
        res.sendStatus(401);
        return;
    }

    const token: string = authorization.replace('Bearer ', '');

    try {
        const user = await searchUserBySession(token);
        console.log(user)
        // if (!user.rows[0]) {
        //     res.sendStatus(404);
        //     return;
        // }

        const ownedAmount = await getUserOwnedStatus(5); //TODO - pegar o id pela sessão do acesso
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