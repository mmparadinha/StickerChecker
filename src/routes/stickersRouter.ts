import { Router } from "express";
import { getStickers, createSpecialSticker, updateStickerCount, deleteSticker } from "../controllers/stickersController.js";

const stickersRouter = Router();

stickersRouter.get('/hashtags', getStickers);
stickersRouter.post('/hashtags', createSpecialSticker);
stickersRouter.put('/', updateStickerCount);
stickersRouter.delete('/', deleteSticker);

export default stickersRouter;