import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setStateByStorageData, setToInitialData } from "../../redux/slices/buyingSlice";
import { getTickets, setToInitialData as setToInitialTicketData } from "../../redux/slices/ticketSlice";
import { setToInitialData as setToInitialOrderData } from "../../redux/slices/orderSlice";
import dayjs from "dayjs";
import Buying from "./Buying";


const BuyingCheck = () => {

  const hallRedux = useSelector(state => state.buyingReducer.hall);
  const movieRedux = useSelector(state => state.buyingReducer.movie);
  const sessionRedux = useSelector(state => state.buyingReducer.session);
  const placesByHallRedux = useSelector(state => state.buyingReducer.placesByHall);

  // сатусы загрузки данных
  const ticketsReduxLoading = useSelector(state => state.ticketsReducer.loading);
  const ordersReduxLoading = useSelector(state => state.orderReducer.loading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // sessionStorage
  // const hallStorage = sessionStorage.getItem('hall'); // поиск сохраненных данных в хранилище
  // const movieStorage = sessionStorage.getItem('movie'); // поиск сохраненных данных в хранилище
  // const cinemaSessionStorage = sessionStorage.getItem('session'); // поиск сохраненных данных в хранилище
  // const placesByHallStorage = sessionStorage.getItem('placesByHall'); // поиск сохраненных данных в хранилище


  useEffect(() => {
    // console.log('Buying page effect is on');
    dispatch(getTickets());

    if (!hallRedux && !movieRedux && !sessionRedux && placesByHallRedux) {
      console.log('Обновление данных из хранилища после перезагрузки страницы');      
      dispatch(setStateByStorageData());
    }
  }, []);

  // Проблемы с загрузкой (запрос вернулся с ошибкой)
  if (ticketsReduxLoading === 'failed' || ordersReduxLoading === 'failed') {
    return (
      <main>
        <button style={{padding: '5px', marginBottom: '10px'}} onClick={() => {
          dispatch(setToInitialData());
          dispatch(setToInitialTicketData());
          dispatch(setToInitialOrderData());
          
          navigate("../schedule/" + dayjs().format('YYYY-MM-DD'));
        }}>
          Вернуться на главную
        </button>
          <section className="buying">
          <br />
          <h2>Упс, что-то сломалось :( Проносим Вам свои извинения.</h2>
          <p>
            <span>Вернитесь на главную и повторите запрос позднее.</span>
            <br />
          </p>
        </section>
      </main>
    )
  }  

  // Загрузка
  if (ticketsReduxLoading !== 'idle' || ordersReduxLoading !== 'idle') {
    return (
      <main>
        <button style={{padding: '5px', marginBottom: '10px'}} onClick={() => {
          dispatch(setToInitialData());
          navigate("../schedule/" + dayjs().format('YYYY-MM-DD'));
        }}>
          Вернуться на главную
        </button>
        <div>
          <span className="loader" ></span>
        </div>
      </main>
    )
  }

  if (!hallRedux && !movieRedux && !sessionRedux) {

  // if (!hallStorage && !movieStorage && !cinemaSessionStorage && !placesByHallStorage) {
    return (
      <main>
        <button style={{padding: '5px', marginBottom: '10px'}} onClick={() => {
          dispatch(setToInitialData());
          navigate("../schedule/" + dayjs().format('YYYY-MM-DD'));
        }}>
          Вернуться на главную
        </button>
        <section className="buying">
          <h2>Не так быстро :)</h2>
          <p>
            <span>Сначала нужно выбрать сеанс для выбора мест.</span>
            <br />
            <Link to={`../schedule/${dayjs().format('YYYY-MM-DD')}`}>Показать сеансы на текущую дату?</Link>
          </p>
        </section>
      </main>
    )
  }

  return (
    <Buying />
  )
}

export default BuyingCheck