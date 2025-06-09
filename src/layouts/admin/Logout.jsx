import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import apiClient from "../../services/api";
import { setLoggedOut } from "../../redux/slices/loginSlice";

const Logout = () => {
  const loginRedux = useSelector(state => state.loginReducer.loggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await apiClient.post('/logout');
      if (response.status === 204) {
        dispatch(setLoggedOut());
        // sessionStorage.removeItem('userIsAdmin');

        navigate('/login');
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