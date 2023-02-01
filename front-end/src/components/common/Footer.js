import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Footer({ params }) {
    return (
        <Main>
            <Menu to="/missing" selected={params.missing}>
                <h2>Faltantes</h2>
            </Menu>
            <Menu to="/" selected={params.owned}>
                <h2>Obtidas</h2>
            </Menu>
            <Menu to="/doubled" selected={params.doubled}>
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
    width: 200px;
    padding: 10px;
    border-radius: 20px;
    text-align: center;

    color: ${props => props.selected ? '#FFFFFF' : '#000000'};
    background-color: ${props => props.selected ? '#000080' : '#FFFFFF'};
    border: 2px solid ${props => props.selected ? '#FFFFFF' : '#000080'};
`;