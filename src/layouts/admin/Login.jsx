// import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setApiToken, setLoggedIn } from "../../redux/slices/loginSlice";
import Tooltip from "../client/Tooltip";
import apiClient, { frontendBase } from "../../services/api";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tooltip, setTooltip] = useState({
    text: '',
    active: false
  });

  // redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const tokenResponse = await apiClient.post(
        'api/createToken',
        {
          email: email,
          password: password,
        });

      console.log(tokenResponse);

      if (tokenResponse.status === 200) {
        // получение bearer token
        const responseData = tokenResponse.data;
        const { token } = responseData;
        // взять часть после "|"
        const apiToken = token.split('|')[1];

        dispatch(setApiToken(apiToken));
        // запись в куки "token=<apitoken>"
        document.cookie = 'apiToken=' + apiToken;

        dispatch(setLoggedIn());
        // navigate('/'); // localhost routes
        navigate(frontendBase + '/');
      }
    } catch (error) {
      console.log(error);

      // Когда пользователь залогинен, но отсутствует запись в сессии
      if (error.response.status === 403 && error.response.data.message === "Already Authenticated") {
        console.log('сессия пользователя обновлена');
        dispatch(setLoggedIn());
        // navigate('/'); // localhost routes
        navigate(frontendBase + '/');
      }

      setTooltip({
        text: error.response.data.message || Object.values(error.response.data.err)[0], // перехваченный текст ошибки запроса
        active: true
      });
      setTimeout(() => {
        setTooltip({
          text: '',
          active: false
        });
      }, 2000);
    }
  }

  return (
    <main>
      <section className="login">
        <header className="login__header">
          <h2 className="login__title">Авторизация</h2>
        </header>
        <div className="login__wrapper">
          <form className="login__form" onSubmit={handleSubmit}>

            {/* @csrf */}

            <label className="login__label" htmlFor="email">
              E-mail
              <input
                className="login__input"
                type="email"
                placeholder="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="login__label" htmlFor="pwd">
              Пароль
              <input
                className="login__input"
                type="password"
                placeholder="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <div className="text-center">
              <input
                value="Авторизоваться"
                type="submit"
                className="login__button"
              />
            </div>

            {tooltip.active && <Tooltip text={tooltip.text} />}

          </form>
        </div>
      </section>
    </main>

  )
}

export default Login