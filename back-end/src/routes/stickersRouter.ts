import { Router } from "express";
import { getOwnedStickers, getDoubledStickers, getMissingStickers, createSpecialSticker, decreaseStickerCount, increaseStickerCount, removeSticker } from "../controllers/stickersController";
import { authenticateToken } from "../middlewares/authenticationMiddleware";

const stickersRouter = Router();

stickersRouter
    .all('/*', authenticateToken)
    .get('/owned', getOwnedStickers)
    .get('/doubled', getDoubledStickers)
    .get('/missing', getMissingStickers)
    .post('/', createSpecialSticker)
    .put('/decrease/:stickerId', decreaseStickerCount)
    .put('/increase/:stickerId', increaseStickerCount)
    .delete('/:stickerId', removeSticker);

export default stickersRouter;