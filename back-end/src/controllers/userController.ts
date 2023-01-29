// import { Request, Response } from "express";
// import bcrypt from 'bcrypt';
// import { v4 as uuid } from "uuid";
// import { searchUser, insertNewUser, checkSession, insertNewSession, removeUser, searchUserBySession, changeUsername, getUserStats, getUserInfo } from "../repositories/userRepository";

// //TODO - usar outra forma de sanitização HTML

// export async function createUser(req: Request, res: Response) {
//     const username: string = req.body.username.trim();
//     const email: string = req.body.email.trim();
//     const password: string = req.body.password.trim();
//     const encryptedPassword: string = bcrypt.hashSync(password, 10);

//     try {
//         const emailExists = await searchUser(email);
//         if (emailExists.rows[0]) {
//             res.sendStatus(409);
//             return;
//         }

//         const body = {
//             username,
//             email,
//             password: encryptedPassword
//         }
//         await insertNewUser(body);
//         res.sendStatus(201);
//         return;

//     } catch (err: unknown) {
//         console.error(err);
//         res.sendStatus(500);
//         return;
//     }
// }

// export async function signInUser(req: Request, res: Response) {
//     const email: string = req.body.email.trim();
//     const password: string = req.body.password.trim();

//     try {
//         const user = await searchUser(email);
//         if (!user.rows[0]) {
//             res.sendStatus(404);
//             return;
//         }

//         const passwordCheck: boolean = bcrypt.compareSync(password, user.rows[0].password);

//         if (user && passwordCheck) {
//             const session = await checkSession(user.rows[0].email);

//             if (session.rows[0]) {
//                 const body = {
//                     token: session.rows[0].token,
//                     username: user.rows[0].username,
//                 }
//                 res.status(200).send(body);
//                 return;

//             } else {
//                 const token: string = uuid();
//                 const body = {
//                     userId: user.rows[0].id,
//                     token
//                 }
//                 await insertNewSession(body);

//                 res.status(200).send({
//                     token
//                 });
//                 return;

//             }
//         } else {
//             res.sendStatus(401);
//             return;
//         }
//     } catch (err: unknown) {
//         console.error(err);
//         res.sendStatus(500);
//         return;
//     }
// }

// export async function updateUsername(req: Request, res: Response) {
//     const password: string = req.body.password.trim();
//     const username: string = req.body.username.trim();
//     const { authorization } = req.headers;
//     if (!authorization) {
//         res.sendStatus(401);
//         return;
//     }

//     const token: string = authorization.replace('Bearer ', '');

//     try {
//         const user = await searchUserBySession(token);
//         if (!user.rows[0]) {
//             res.sendStatus(404);
//             return;
//         }

//         const passwordCheck: boolean = bcrypt.compareSync(password, user.rows[0].password);

//         if (user && passwordCheck) {
//             await changeUsername(username, user.rows[0].email);
//             res.sendStatus(200);
//             return;
//         } else {
//             res.sendStatus(401);
//             return;
//         }

//     } catch (err: unknown) {
//         console.error(err);
//         res.sendStatus(500);
//         return;
//     }
// }

// export async function deleteUser(req: Request, res: Response) {
//     const password: string = req.body.password.trim();
//     const { authorization } = req.headers;
//     if (!authorization) {
//         res.sendStatus(401);
//         return;
//     }

//     const token: string = authorization.replace('Bearer ', '');

//     try {
//         const user = await searchUserBySession(token);
//         if (!user.rows[0]) {
//             res.sendStatus(404);
//             return;
//         }

//         const passwordCheck: boolean = bcrypt.compareSync(password, user.rows[0].password);

//         if (user && passwordCheck) {
//             await removeUser(user.rows[0].email);
//             res.sendStatus(204);
//             return;
//         } else {
//             res.sendStatus(401);
//             return;
//         }

//     } catch (err: unknown) {
//         console.error(err);
//         res.sendStatus(500);
//         return;
//     }
// }

// export async function userStats(req: Request, res: Response) {
//     const { authorization } = req.headers;
//     if (!authorization) {
//         res.sendStatus(401);
//         return;
//     }

//     const token: string = authorization.replace('Bearer ', '');

//     try {
//         const user = await searchUserBySession(token);
//         if (!user.rows[0]) {
//             res.sendStatus(404);
//             return;
//         }

//         const userInfo = await getUserStats(user.rows[0].email);
//         console.log(userInfo)
//         res.status(200).send(userInfo.rows[0]);
//         return;

//     } catch (err: unknown) {
//         console.error(err);
//         res.sendStatus(500);
//         return;
//     }
// }

// export async function userIdentification(req: Request, res: Response) {
//     const { authorization } = req.headers;
//     if (!authorization) {
//         res.sendStatus(401);
//         return;
//     }

//     const token: string = authorization.replace('Bearer ', '');

//     try {
//         const user = await searchUserBySession(token);
//         if (!user.rows[0]) {
//             res.sendStatus(404);
//             return;
//         }

//         const userInfo = await getUserInfo();
//         res.status(200).send(userInfo.rows);
//         return;

//     } catch (err: unknown) {
//         console.error(err);
//         res.sendStatus(500);
//         return;
//     }
// }