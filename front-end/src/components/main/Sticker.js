import styled from "styled-components";
import { useState } from "react";

export default function Sticker({data}) {
    const [disabled, setDisabled] = useState(false);

    function markOwned() { 
        console.log(`agora eu tenho a figurinha ${data.stickerNumber}`);
        setDisabled(true);
    }
    
    return (
        <Main disabled={disabled} onClick={markOwned}>
            <p>{data.countryId} {data.stickerNumber}</p>
        </Main>
    );
}

const Main = styled.button`
    background-color: lightgray;
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
    }
`;