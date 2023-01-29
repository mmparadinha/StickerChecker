import { Request, Response } from "express";
import { findUserStickers, findDoubledStickers, findMissingStickers } from "../repositories/stickersRepository";

export async function getOwnedStickers(req: Request, res: Response) {
    const userId = 5;
    try {
        const ownedStickers = await findUserStickers(userId);
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

export async function getDoubledStickers(req: Request, res: Response) {
    const userId = 5;

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

export async function getMissingStickers(req: Request, res: Response) {
    const userId = 5;

    try {
        const missingStickers = await findMissingStickers(userId);
        if (!missingStickers) {
            return res.sendStatus(400);
        }
        
        res.status(200).send(missingStickers);
        return;
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
        return;
    }
}

export async function createSpecialSticker(req: Request, res: Response) {

}

export async function updateStickerCount(req: Request, res: Response) {

}

export async function deleteSticker(req: Request, res: Response) {

}