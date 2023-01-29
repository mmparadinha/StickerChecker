import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <Main>
            <Menu to="/missing">
                <h2>Faltantes</h2>
            </Menu>
            <Menu to="/">
                <h2>Obtidas</h2>
            </Menu>
            <Menu to="/doubled">
                <h2>Repetidas</h2>
            </Menu>
        </Main>
    );
}

const Main = styled.div`
    background-color: purple;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 10px;
    padding: 10px;
`;

const Menu = styled(Link)`
    background-color: white;
    width: 200px;
    padding: 10px;
    border-radius: 20px;
    color: #000000;
    text-align: center;
`;