// import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../../redux/slices/loginSlice";
import Tooltip from "../client/Tooltip";
import apiClient from "../../services/api";

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
      await apiClient.get('/sanctum/csrf-cookie');
      const response = await apiClient.post('/login', {
        email: email,
        password: password
      });
      console.log(response)
      if (response.status === 204) {
        dispatch(setLoggedIn());
        navigate('/')
      }
    } catch (error) {
      console.log(error);
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