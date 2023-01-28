import { Router } from "express";
import { getStickers, createSpecialSticker, updateStickerCount, deleteSticker } from "../controllers/stickersController";

const stickersRouter = Router();

stickersRouter.get('/', getStickers);
stickersRouter.post('/', createSpecialSticker);
stickersRouter.put('/', updateStickerCount);
stickersRouter.delete('/', deleteSticker);

export default stickersRouter;