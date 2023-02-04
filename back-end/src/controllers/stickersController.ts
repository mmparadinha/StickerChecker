import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authenticationMiddleware";
import { findAllUserStickers, findDoubledStickers, updateDoubledSticker, createUserSticker, updateMissingSticker, resetUserSticker, findStickers, findSingleUserSticker } from "../repositories/stickersRepository";

export async function getOwnedStickers(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;

    try {
        const ownedStickers = await findAllUserStickers(userId);
        if (!ownedStickers) {
            return res.sendStatus(400);
        }

        res.status(200).send(ownedStickers);
        return;
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
        return;
    }
}

export async function getDoubledStickers(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;

    try {
        const doubledStickers = await findDoubledStickers(userId);
        if (!doubledStickers) {
            return res.sendStatus(400);
        }
        
        res.status(200).send(doubledStickers);
        return;
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
        return;
    }
}

export async function getMissingStickers(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;

    try {
        const allStickers = await findStickers();
        const ownedStickers = await findAllUserStickers(userId);

        const missingStickers = [];
        const hashTable = {};

        for (let i = 0; i < ownedStickers.length; i++) {
            if (!hashTable[ownedStickers[i].stickerId]) {
                hashTable[ownedStickers[i].stickerId] = true;
            }
        }

        for (let i = 0; i < allStickers.length; i++) {
            if (!hashTable[allStickers[i].id]) {
                missingStickers.push(allStickers[i]);
            }
        }

        res.status(200).send(missingStickers);
        return;
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export async function createSpecialSticker(req: AuthenticatedRequest, res: Response) {

}

export async function decreaseStickerCount(req: AuthenticatedRequest, res: Response) {
    const stickerId = Number(req.params.stickerId);
    const { userId } = req;

    try {
        const userOwnsSticker = await findSingleUserSticker(userId, stickerId);

        if (userOwnsSticker !== null && userOwnsSticker.amount > 0) {
            await updateDoubledSticker(userOwnsSticker.id);
        }

        res.sendStatus(204);
        return;
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export async function increaseStickerCount(req: AuthenticatedRequest, res: Response) {
    const stickerId = Number(req.params.stickerId);
    console.log(stickerId);
    const { userId } = req;

    try {
        const userOwnsSticker = await findSingleUserSticker(userId, stickerId);

        if (userOwnsSticker === null) {
            await createUserSticker(userId, stickerId);
        } else {
            await updateMissingSticker(userOwnsSticker.id);
        }

        res.sendStatus(204);
        return;
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export async function removeSticker(req: AuthenticatedRequest, res: Response) {
    const stickerId = Number(req.params.stickerId);
    const { userId } = req;

    try {
        await resetUserSticker(userId, stickerId);

        res.sendStatus(204);
        return;

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}