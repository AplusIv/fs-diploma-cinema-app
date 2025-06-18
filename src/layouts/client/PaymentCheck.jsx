import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToInitialData, setStateByStorageData as setDataInBuyingSlice } from "../../redux/slices/buyingSlice";
import { getNewOrderTickets, setStateByStorageData as setDataInTicketSlice, setToInitialData as setToInitialTicketData } from "../../redux/slices/ticketSlice";
import { setStateByStorageData as setDataInOrderSlice, setToInitialData as setToInitialOrderData } from "../../redux/slices/orderSlice";
import Payment from "./Payment";
import dayjs from "dayjs";

const PaymentCheck = () => {

  const hallRedux = useSelector(state => state.buyingReducer.hall);
  const movieRedux = useSelector(state => state.buyingReducer.movie);
  const sessionRedux = useSelector(state => state.buyingReducer.session);
  const orderRedux = useSelector(state => state.orderReducer.newOrder);

  // сатусы загрузки данных
  const ticketsReduxLoading = useSelector(state => state.ticketsReducer.loading);
  const ordersReduxLoading = useSelector(state => state.orderReducer.loading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // sessionStorage
  const hallStorage = sessionStorage.getItem('hall'); // поиск сохраненных данных в хранилище
  const movieStorage = sessionStorage.getItem('movie'); // поиск сохраненных данных в хранилище
  const cinemaSessionStorage = sessionStorage.getItem('session'); // поиск сохраненных данных в хранилище
  const placesByHallStorage = sessionStorage.getItem('placesByHall'); // поиск сохраненных данных в хранилище
  const orderStorage = sessionStorage.getItem('newOrder'); // поиск сохраненных данных в хранилище
  const newOrderTicketsStorage = sessionStorage.getItem('newOrderTickets'); // поиск сохраненных данных в хранилище

  useEffect(() => {
    // console.log('Buying page effect is on');

    if (!orderRedux && !hallRedux && !movieRedux && !sessionRedux) {
      if (hallStorage && movieStorage && cinemaSessionStorage && placesByHallStorage && orderStorage && newOrderTicketsStorage) {
        // console.log('Обновление данных из хранилища после перезагрузки страницы');
        dispatch(setDataInBuyingSlice());
        dispatch(setDataInOrderSlice());
        dispatch(setDataInTicketSlice());
      }
    }

    // если есть заказ -> запросить его билеты
    if (orderRedux) {
      dispatch(getNewOrderTickets({
        url: 'api/guest/tickets/order',
        id: orderRedux.id,
      }))
    }
  }, []);

  // Проблемы с загрузкой (запрос вернулся с ошибкой)
  if (ticketsReduxLoading === 'failed' || ordersReduxLoading === 'failed') {
    return (
      <main>
        <button 
          style={{padding: '5px', marginBottom: '10px'}} 
          onClick={() => {
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
        <button
          style={{padding: '5px', marginBottom: '10px'}} 
          onClick={() => {
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

  // if (!orderRedux && !hallRedux && !movieRedux && !sessionRedux && placesByHallRedux) {
  if (!orderRedux && !hallRedux && !movieRedux && !sessionRedux) {

    return (
      <main>
        <button 
          style={{padding: '5px', marginBottom: '10px'}}
          onClick={() => {
          dispatch(setToInitialData());
          navigate("../schedule/" + dayjs().format('YYYY-MM-DD'));
        }}>
          Вернуться на главную
        </button>
        <section className="buying">
          <h2>Не так быстро :)</h2>
          <p>
            <span>Сначала нужно выбрать сеанс для выбора мест, а потом уже пытаться оплатить.</span>
            <br />
            <Link to={`../schedule/${dayjs().format('YYYY-MM-DD')}`}>Показать сеансы на текущую дату?</Link>
          </p>
        </section>
      </main>
    )
  }
  return (
    <Payment />
  )
}

export default PaymentCheck