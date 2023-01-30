import { Router } from "express";
import { getOwnedStickers, getDoubledStickers, getMissingStickers, createSpecialSticker, decreaseStickerCount, increaseStickerCount, deleteSticker } from "../controllers/stickersController";

const stickersRouter = Router();

stickersRouter.get('/owned', getOwnedStickers);
stickersRouter.get('/doubled', getDoubledStickers);
stickersRouter.get('/missing', getMissingStickers);
stickersRouter.post('/', createSpecialSticker);
stickersRouter.put('/decrease/:userStickerId', decreaseStickerCount);
stickersRouter.put('/increase/:userStickerId', increaseStickerCount);
stickersRouter.delete('/:userStickerId', deleteSticker);

export default stickersRouter;