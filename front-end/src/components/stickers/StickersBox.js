import styled from 'styled-components';
import MissingSticker from './missing/MissingSticker.js';
import OwnedSticker from './owned/OwnedSticker.js';
import DoubledSticker from './doubled/DoubledSticker.js';

export default function StickersBox({ data, props }) {
  function stickerType() {
    if (props?.missing) {
      return data.stickers.map(sticker => <MissingSticker key={sticker.id} country={data.name} data={sticker} />);
    } else if (props?.owned) {
      return data.stickers.map(sticker => <OwnedSticker key={sticker.id} country={data.name} data={sticker} />);
    } else if (props?.doubled) {
      return data.stickers.map(sticker => <DoubledSticker key={sticker.id} country={data.name} data={sticker} />);
    }
  }

  return (
    <MainBox>
      <Title>{data.name}</Title>
      <Stickers>
        {stickerType()}
      </Stickers>
    </MainBox>
  );
}

const MainBox = styled.div`
  background-color: #F0F0F0;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const Title = styled.div`
  background-color: darkred;
  width: 100%;
  padding: 10px;
`;

const Stickers = styled.div`
  padding: 10px;
  gap: 15px;
  display: flex;
  flex-wrap: wrap;
`;
