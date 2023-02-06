import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authenticationMiddleware";
import { findAllUserStickers, findDoubledStickers, updateDoubledSticker, createUserSticker, updateMissingSticker, resetUserSticker, findStickers, findSingleUserSticker } from "../repositories/stickersRepository";

//TO DO - adicionar camada de services
export async function getOwnedStickers(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const ownedStickers = await findAllUserStickers(userId);
    if (!ownedStickers) {
      return res.sendStatus(400);
    }

    const result = ownedStickers.filter(country => country.stickers.length !== 0)

    res.status(200).send(result);
    return;
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
    return;
  }
}

//TO DO - ajustar o filtro de ausência de figurinhas pela solicitação do prisma (retornando figurinhas sem reserva)
export async function getDoubledStickers(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const doubledStickers = await findDoubledStickers(userId);
    if (!doubledStickers) {
      return res.sendStatus(400);
    }

    const result = doubledStickers.filter(country => country.stickers.length !== 0)

    res.status(200).send(result);
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
    const userMissingStickers = await findStickers(userId);

    const result = userMissingStickers.filter(country => country.stickers.length !== 0)

    res.status(200).send(result);
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

    if (userOwnsSticker !== null && userOwnsSticker.amount > 1) {
      await updateDoubledSticker(userOwnsSticker.id);
    } else if (userOwnsSticker.amount === 0) {
      await resetUserSticker(userId, stickerId);
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
