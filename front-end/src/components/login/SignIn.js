import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { postLogin } from "../../services/StickerChecker.js";
import UserContext from "../../context/UserContext";

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
  }, [navigate]);

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

  async function logIn(e) {
    e.preventDefault();
    setSending(true);
    try {
      const response = await postLogin(login);
      localStorage.setItem("sticker-checker", JSON.stringify(response.data));
      setUserInfo(response.data)
      //navigate("/owned");
    } catch (error) {
      resetForm();
      alert("Não foi possível logar, tente novamente");
      console.error(error);
    }
  };

  return (
    <Main>
      <DescriptionContainer>
        <h1>Sticker Checker</h1>
        <p>acompanhe o progresso do seu álbum da forma mais prática possível</p>
      </DescriptionContainer>
      <RegistrationData>
        <FormBox onSubmit={logIn}>
          <input
            type="email"
            name="email"
            placeholder="e-mail"
            onChange={updateInput}
            value={login.email}
            required
            disabled={sending}
          />
          <input
            type="password"
            name="password"
            placeholder="senha"
            onChange={updateInput}
            value={login.password}
            required
            disabled={sending}
          />
          <button>Entrar</button>
        </FormBox>
        <p onClick={() => navigate("/signup")}>
          Primeria vez? Crie a sua conta!
        </p>
      </RegistrationData>
    </Main>
  );
}

const Main = styled.div`
  display: flex;

  @media (max-width: 645px) {
    flex-direction: column;
  }
`;

const DescriptionContainer = styled.div`
  width: 60vw;
  height: 100vh;

  background-color: yellow;
  color: #000080;
  padding: 15px;
  gap: 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    font-size: 106px;
    font-weight: 700;
  }

  p {
    font-size: 43px;
    font-weight: 400;
    line-height: 64px;
  }

  @media (max-width: 1050px) {
    h1 {
      font-size: 66px;
      font-weight: 700;
    }

    p {
      font-size: 22px;
      font-weight: 400;
      line-height: 33px;
    }
  }
  
  @media (max-width: 645px) {
    width: 100vw;
    height: 35vh;
    justify-content: center;
    text-align: center;
  }

  h1 {
    font-size: 66px;
    font-weight: 700;
  }

  p {
    font-size: 22px;
    font-weight: 400;
    line-height: 33px;
  }
`;

const RegistrationData = styled.div`
  width: 40vw;

  background-color: blue;

  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    margin: 0 auto;
    background-color:red;
    color: white;
    font-size: 20px;
    font-weight: 400;
    
    text-align: center;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  @media (max-width: 1050px) {
    p {
      font-size: 14px;
    }
  }

  @media (max-width: 645px) {
    width: 100vw;
    height: 65vh;
    justify-content: center;

    p {
      font-size: 17px;
    }
  }
`;

const FormBox = styled.form`
  gap: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: pink;

  input {
    width: 100%;
    height: 65px;
    padding: 10px;

    border: none;
    border-radius: 6px;

    background-color: white;
    color: #9f9f9f;
    font-size: 27px;
    font-weight: 700;
  }

  button {
    width: 100%;
    height: 65px;
    padding: 10px;

    border: none;
    border-radius: 6px;

    background-color: #1877f2;
    color: white;
    font-size: 27px;
    font-weight: 700;

    &:hover {
      cursor: auto;
    }
  }

  @media (max-width: 1050px) {
    input {
      height: 45px;
      font-size: 18px;
    }
    button {
      height: 45px;
      font-size: 18px;
    }
  }

  @media (max-width: 645px) {
    width: 100%;

    input {
      height: 55px;
      font-size: 22px;
    }
    button {
      height: 55px;
      font-size: 22px;
    }
  }
`;