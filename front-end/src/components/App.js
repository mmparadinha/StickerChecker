import { useEffect, useState } from "react";
import { getAllStickers } from "../services/StickerChecker.js";

function App() {
  const [stickers, setStickers] = useState([]);

  async function teste() {
    const response = await getAllStickers();
    setStickers(response.data.rows);
  }

  useEffect(() => {
    teste();
  }, []);

  return (
    <>
      <div>
        teste
      </div>
      {stickers.map(data => data.stickerNumber)}
    </>
  );
}

export default App;
