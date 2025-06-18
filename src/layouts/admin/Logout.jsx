import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import apiClient, { frontendBase, getCookie } from "../../services/api";
import { setApiToken, setLoggedOut } from "../../redux/slices/loginSlice";

const Logout = () => {
  const loginRedux = useSelector(state => state.loginReducer.loggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {

    // получение актуальных на момент запроса кук, поиск apiToken
    const { apiToken } = getCookie();

    try {
      const response = await apiClient.post(
        'api/logout',
        null,
        {
          headers: {
            Authorization: 'Bearer ' + apiToken,
          }
        });
      if (response.status === 204) {
        dispatch(setLoggedOut());
        dispatch(setApiToken(null));

        // удаление куки с токеном (передать отрицательную дату)
        document.cookie = `apiToken=;expires=${new Date(0)}`;

        // navigate('/login'); // localhost routes
        navigate(frontendBase + '/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    loginRedux
      // isLoggedIn
      ? <button type="button" className="conf-step__button conf-step__button-warning" onClick={logout} >Выйти</button>
      : null
  )
}

export default Logout