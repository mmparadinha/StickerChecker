import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { postSignUp } from "../../services/StickerChecker";
import UserContext from "../../context/UserContext";
import { Input } from "./Input";
import { Button } from "./Button";
import { FormContainer } from "./Form";
import { Description } from "./Description";

export default function SignUp() {
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);
  const [sending, setSending] = useState(false);
  const [registration, setRegistration] = useState({
    email: "",
    username: "",
    password: "",
    passwordConfirmation: ""
  });

  useEffect(() => {
    if (userInfo?.token !== undefined) {
      navigate("/owned");
    }
  }, [navigate, userInfo]);

  function updateInput(e) {
    setRegistration({ ...registration, [e.target.name]: e.target.value });
  };

  function resetForm() {
    setRegistration({
      username: "",
      email: "",
      password: "",
      passwordConfirmation: ""
    });
    setSending(false);
  }

  async function signUp(e) {
    e.preventDefault(e);
    setSending(true);
    try {
      await postSignUp(registration);
      setSending(false);
      navigate('/');
    } catch (error) {
      alert('Não foi possível finalizar seu cadastro, tente novamente');
      console.error(error);
      resetForm();
    }
  };

  return (
    <Main>
      <Description/>

      <FormContainer onSubmit={signUp}>
        <Input
          disabled={sending}
          required
          type='text'
          name='username'
          value={registration.username}
          onChange={updateInput}
          placeholder='Nome'
        />
        <Input
          disabled={sending}
          required
          type='email'
          name='email'
          value={registration.email}
          onChange={updateInput}
          placeholder='E-mail'
        />
        <Input
          disabled={sending}
          required
          type='password'
          name='password'
          value={registration.password}
          onChange={updateInput}
          placeholder='Senha'
        />
        <Input
          disabled={sending}
          required
          type='password'
          name='passwordConfirmation'
          value={registration.passwordConfirmation}
          onChange={updateInput}
          placeholder='Confirmar senha'
        />
        <Button type='submit' disabled={sending}> {sending ? 'Carregando...' : 'Criar conta'} </Button>
        <p onClick={() => navigate("/")}>
          Já possui conta? Acesse!
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
