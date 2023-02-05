import styled from 'styled-components';
import { useState } from 'react';
import { addNewSticker } from '../../../services/StickerChecker';

export default function Sticker({ data }) {
  const stickerName = data.countries.name + ' ' + data.stickerNumber;
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
    <Main onClick={markSticker} disabled={disabled}>
      <p>{stickerName}</p>
    </Main>
  );
}

const Main = styled.button`
  background-color: lightblue;
  height: 100px;
  width: 80px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;

  &:hover {
      cursor: pointer;
  }

  &:disabled {
      cursor: not-allowed;
      background-color: darkgray;
      color: #FFFFFF;
  }
`;
