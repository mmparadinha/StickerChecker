import { useState } from 'react';
import { addNewSticker } from '../../../services/StickerChecker';
import { Sticker } from '../Sticker';

export default function MissingSticker({ country, data }) {
  const stickerName = country + ' ' + data.stickerNumber;
  const [disabled, setDisabled] = useState(false);

  async function markSticker() {
    if (disabled) { return; }

    try {
      await addNewSticker(data.id);
      setDisabled(true);
    } catch (error) {
      console.error(error);
      alert('Não foi possível, tente novamente!');
    }
  }

  return (
    <Sticker onClick={markSticker} disabled={disabled}>
      <p>{stickerName}</p>
    </Sticker>
  );
}
