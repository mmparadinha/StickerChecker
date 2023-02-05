import { removeSticker, addNewSticker } from '../../../services/StickerChecker.js';
import { StickerAmountContainer } from '../StickerAmountContainer.js';
import { StickerContainer } from '../StickerContainer.js';
import { DeleteStickerButton } from './DeleteStickerButton.js';

export default function Sticker({ data }) {
  const stickerName = data.stickers.countries.name + ' ' + data.stickers.stickerNumber;

  async function unmarkOwned(e) {
    e.stopPropagation();
    let confirmation = window.confirm(`Você tem certeza que deseja remover a figurinha ${stickerName} da sua lista?\nTODOS exemplares iguais serão removidos.\nPara remover apenas uma, utilize a aba de Repetidas`);
    if (confirmation) {
      try {
        await removeSticker(data.stickers.id);
      } catch (error) {
        console.error(error);
        alert('Não foi possível, tente novamente!');
      }
    }
  }

  async function markSticker() {
    try {
      await addNewSticker(data.stickers.id);
    } catch (error) {
      console.error(error);
      alert('Não foi possível, tente novamente!');
    }
  }

  return (
    <StickerContainer onClick={markSticker}>
      <DeleteStickerButton onClick={unmarkOwned} />
      <p>{stickerName}</p>
      <StickerAmountContainer>{data.amount}</StickerAmountContainer>
    </StickerContainer>
  );
}
