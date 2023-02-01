import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserRegistration from "./SignUp";
import UserContext from "../../context/UserContext.js";
import { postLogin } from "../../services/StickerChecker.js";

export default function SignIn() {
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);
  const [clicado, setClicado] = useState(false);
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });
  const { setUserInfo } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("sticker-checker") !== null) {
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
      localStorage.setItem("sticker-checker", JSON.stringify({
        token: response.token,
        username: response.username
      }));
      setUserInfo({
        ...response,
      })
      navigate("/owned");
    } catch (error) {
      resetForm();
      alert("Não foi possível logar, tente novamente");
      console.error(error);
    }
  };

  function registryAccess() {
    if (!clicado) {
      return (
        <SignupComponents>
          <DescriptionComponents>
            <div className="description">
              <h1>linkr</h1>
              <p>
                save, share and discover <br /> the best links on the web
              </p>
            </div>
          </DescriptionComponents>
          <RegistrationData>
            <form onSubmit={logIn}>
              <label>
                <input
                  id="formEmail"
                  type="email"
                  name="email"
                  placeholder="e-mail"
                  onChange={updateInput}
                  value={login.email}
                  required
                />
              </label>
              <label>
                <input
                  id="forPassword"
                  type="password"
                  name="password"
                  placeholder="password"
                  onChange={updateInput}
                  value={login.password}
                  required
                />
              </label>
              <button>Log In</button>
              <p onClick={() => setClicado(true)}>
                First time? Create an account!
              </p>
            </form>
          </RegistrationData>
        </SignupComponents>
      );
    }

    if (clicado) {
      return (
        <UserRegistration
          SignupComponents={SignupComponents}
          DescriptionComponents={DescriptionComponents}
          RegistrationData={RegistrationData}
          setClicado={setClicado}
          navigate={navigate}
        />
      );
    }
  }

  return <>{registryAccess()}</>;
}

const SignupComponents = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 645px) {
    flex-direction: column;
  }
`;

const DescriptionComponents = styled.div`
  width: 65vw;
  height: 100vh;
  background-color: #151515;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  h1 {
    font-size: 106px;
    font-family: "Passion One";
  }
  p {
    width: 435px;
    font-size: 43px;
    font-family: "Oswald";
    line-height: 64px;
    font-weight: 400;
  }
  @media (max-width: 950px) {
    width: 50%;
    h1 {
      font-size: 80px;
    }
    p {
      width: 250px;
      font-size: 25px;
      line-height: 50px;
    }
  }
  @media (max-width: 645px) {
    width: 100%;
    height: 175px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    position: fixed;
    .description {
      width: 100%;
      font-size: 23px;
      line-height: 34.09px;
      text-align: center;
    }
    h1 {
      width: 100%;
      font-size: 76px;
      line-height: 83.86px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    @media (max-width: 645px) {
      width: 100%;
      height: 175px;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      position: fixed;
      .description {
        width: 100%;
        font-size: 23px;
        text-align: center;
      }
      h1 {
        width: 100%;
        font-size: 76px;
        line-height: 83.86px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      p {
        font-size: 23px;
        width: 100%;
        text-align: center;
        line-height: 25px;
      }
    }
  }
`;

const RegistrationData = styled.div`
  width: 35vw;
  background-color: #333333;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  input {
    width: 100%;
    height: 65px;
    border: 0;
    border-radius: 6px;
    background-color: white;
    padding-left: 15px;
    margin-bottom: 15px;
    font-family: "Oswald";
    font-size: 27px;
    color: #9f9f9f;
    font-weight: 700;
  }
  button {
    width: 100%;
    height: 65px;
    background-color: #1877f2;
    border: 0;
    border-radius: 6px;
    color: white;
    font-family: "Oswald";
    font-size: 27px;
    font-weight: 700;
    margin-bottom: 20px;
    cursor: pointer;
  }
  p {
    width: 100%;
    color: white;
    font-size: 20px;
    font-family: "Lato";
    font-weight: 400;
    display: flex;
    justify-content: center;
    text-decoration: underline;
    cursor: pointer;
  }
  @media (max-width: 950px) {
    width: 50vw;
    input {
      height: 45px;
      font-size: 18px;
    }
    button {
      height: 45px;
      font-size: 18px;
    }
    p {
      font-size: 14px;
    }
  }
  @media (max-width: 645px) {
    width: 100%;
    margin-top: 215px;
    padding: 20px;
    input {
      width: 100%;
      height: 55px;
      font-size: 22px;
    }
    button {
      width: 100%;
      height: 55px;
      font-size: 22px;
    }
    p {
      width: 100%;
      font-size: 17px;
      line-height: 20.4px;
    }
  }
`;