import { Request, Response } from "express";
import findStickers from "../repositories/stickersRepository";

export async function getStickers(req: Request, res: Response) {
    try {
        const allStickers = await findStickers();
        res.status(200).send(allStickers);
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