// import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../../redux/slices/loginSlice";
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
    // axios.defaults.withCredentials = true;

    try {
      const token = await apiClient.post('/creatToken');
      console.log(token);
      
      const response = await apiClient.post('/login', {
        email: email,
        password: password,
        }, {
          headers: {
        'Authorization': token,
        // 'Content-Type': 'application/json'
      }
        });
      console.log(response)
      if (response.status === 204) {
        dispatch(setLoggedIn());
        // navigate('/'); // localhost routes
        navigate(frontendBase + '/');
      }
    } catch (error) {
      console.log(error);

      // Когда пользователь залогинен, но отсутствует запись в сессии
      if (error.response.status === 403 && error.response.data.message === "Already Authenticated") {
        console.log('сессия пользователя обновлена');
        /* login(); // если основной запрос 302 -> залогиниться
        sessionStorage.setItem('loggedIn', true); */
        dispatch(setLoggedIn());
        // navigate('/'); // localhost routes
        navigate(frontendBase + '/');
      }
      
      setTooltip({
        text: error.response.data.message,
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
                placeholder="admin2@gmail.com"
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
                placeholder=""
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
            {/* <p>{email} + {password}</p> */}

            {tooltip.active && <Tooltip text={tooltip.text} />}

          </form>
        </div>
      </section>
    </main>

  )
}

export default Login