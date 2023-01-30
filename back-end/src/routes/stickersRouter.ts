import { Router } from "express";
import { getOwnedStickers, getDoubledStickers, getMissingStickers, createSpecialSticker, updateStickerCount, deleteSticker } from "../controllers/stickersController";

const stickersRouter = Router();

stickersRouter.get('/owned', getOwnedStickers);
stickersRouter.get('/doubled', getDoubledStickers);
stickersRouter.get('/missing', getMissingStickers);
stickersRouter.post('/', createSpecialSticker);
stickersRouter.put('/', updateStickerCount);
stickersRouter.delete('/:stickerId', deleteSticker);

export default stickersRouter;