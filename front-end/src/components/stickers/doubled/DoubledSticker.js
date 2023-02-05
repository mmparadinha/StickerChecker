import { removeDoubled } from '../../../services/StickerChecker.js';
import { StickerAmountContainer } from '../StickerAmountContainer.js';
import { StickerContainer } from '../StickerContainer.js';

export default function Sticker({ data }) {
  const stickerName = data.stickers.countries.name + ' ' + data.stickers.stickerNumber;
  const necessaryAmount = 1;

  async function decreaseDoubledSticker() {
    try {
      await removeDoubled(data.stickers.id);
    } catch (error) {
      console.error(error);
      alert('Não foi possível, tente novamente!');
    }
  }

  return (
    <StickerContainer onClick={decreaseDoubledSticker}>
      <p>{stickerName}</p>
      <StickerAmountContainer>{data.amount - necessaryAmount}</StickerAmountContainer>
    </StickerContainer>
  );
}
