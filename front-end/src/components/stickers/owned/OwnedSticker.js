import { removeSticker, addNewSticker } from '../../../services/StickerChecker.js';
import { StickerAmountContainer } from '../StickerAmountContainer.js';
import { Sticker } from '../Sticker.js';
import { DeleteStickerButton } from './DeleteStickerButton.js';

export default function OwnedSticker({ country, data }) {
  const stickerName = country + ' ' + data.stickerNumber;

  async function unmarkOwned(e) {
    e.stopPropagation();
    let confirmation = window.confirm(`Você tem certeza que deseja remover a figurinha ${stickerName} da sua lista?\nTODOS exemplares iguais serão removidos.\nPara remover apenas uma, utilize a aba de Repetidas`);
    if (confirmation) {
      try {
        await removeSticker(data.id);
      } catch (error) {
        console.error(error);
        alert('Não foi possível, tente novamente!');
      }
    }
  }

  async function markSticker() {
    try {
      await addNewSticker(data.id);
    } catch (error) {
      console.error(error);
      alert('Não foi possível, tente novamente!');
    }
  }

  return (
    <Sticker onClick={markSticker}>
      <DeleteStickerButton onClick={unmarkOwned} />
      <p>{stickerName}</p>
      <StickerAmountContainer>{data.userStickers[0]?.amount}</StickerAmountContainer>
    </Sticker>
  );
}
