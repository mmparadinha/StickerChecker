import { removeDoubled } from '../../../services/StickerChecker.js';
import { StickerAmountContainer } from '../StickerAmountContainer.js';
import { Sticker } from '../Sticker.js';

export default function DoubledSticker({ country, data }) {
  const stickerName = country + ' ' + data.stickerNumber;
  const necessaryAmount = 1;

  async function decreaseDoubledSticker() {
    try {
      await removeDoubled(data.id);
    } catch (error) {
      console.error(error);
      alert('Não foi possível, tente novamente!');
    }
  }

  return (
    <Sticker onClick={decreaseDoubledSticker}>
      <p>{stickerName}</p>
      <StickerAmountContainer>{data.userStickers[0].amount - necessaryAmount}</StickerAmountContainer>
    </Sticker>
  );
}
