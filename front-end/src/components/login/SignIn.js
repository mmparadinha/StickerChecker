import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { postLogin } from "../../services/StickerChecker.js";
import UserContext from "../../context/UserContext";
import { Input } from "./Input.js";
import { Button } from "./Button.js";
import { FormContainer } from "./Form.js";
import { Description } from "./Description.js";

export default function SignIn() {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [sending, setSending] = useState(false);
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    if (userInfo?.token !== undefined) {
      navigate("/owned");
    }
  }, [navigate, userInfo]);

  function updateInput(e) {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  function resetForm() {
    setLogin({
      email: "",
      password: ""
    });
    setSending(false);
  }

  async function signIn(e) {
    e.preventDefault();
    setSending(true);
    try {
      const response = await postLogin(login);
      localStorage.setItem("sticker-checker", JSON.stringify(response.data));
      setUserInfo(response.data)
      navigate("/owned");
    } catch (error) {
      resetForm();
      alert("Não foi possível logar, tente novamente");
      console.error(error);
    }
  };

  return (
    <Main>
      <Description />

        <FormContainer onSubmit={signIn}>
          <Input
            type="email"
            name="email"
            placeholder="E-mail"
            onChange={updateInput}
            value={login.email}
            required
            disabled={sending}
          />
          <Input
            type="password"
            name="password"
            placeholder="Senha"
            onChange={updateInput}
            value={login.password}
            required
            disabled={sending}
          />
          <Button type='submit' disabled={sending}> {sending ? 'Carregando...' : 'Acessar'} </Button>
        <p onClick={() => navigate("/signup")}>
          Primeria vez? Crie a sua conta!
        </p>
        </FormContainer>

    </Main>
  );
}

const Main = styled.div`
  display: flex;

  @media (max-width: 645px) {
    flex-direction: column;
  }
`;
