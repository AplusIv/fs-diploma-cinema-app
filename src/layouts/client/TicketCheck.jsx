import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToInitialData as setToInitialDataBuyingSlice, setStateByStorageData as setDataInBuyingSlice } from "../../redux/slices/buyingSlice";
import { getNewOrderTickets, setToInitialData as setToInitialDataTicketSlice, setStateByStorageData as setDataInTicketSlice } from "../../redux/slices/ticketSlice";
import { setStateByStorageData as setDataInOrderSlice, setToInitialData as setToInitialDataOrderSlice } from "../../redux/slices/orderSlice";
import dayjs from "dayjs";
import Ticket from "./Ticket";

const TicketCheck = () => {

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
  const hallStorage = JSON.parse(sessionStorage.getItem('hall')); // поиск сохраненных данных в хранилище
  const movieStorage = JSON.parse(sessionStorage.getItem('movie')); // поиск сохраненных данных в хранилище
  const cinemaSessionStorage = JSON.parse(sessionStorage.getItem('session')); // поиск сохраненных данных в хранилище
  const placesByHallStorage = JSON.parse(sessionStorage.getItem('placesByHall')); // поиск сохраненных данных в хранилище
  const orderStorage = JSON.parse(sessionStorage.getItem('newOrder')); // поиск сохраненных данных в хранилище
  const newOrderTicketsStorage = JSON.parse(sessionStorage.getItem('newOrderTickets')); // поиск сохраненных данных в хранилище

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

    if (orderStorage) {
      // console.log('get new order tickets data');
      dispatch(getNewOrderTickets({
        url: 'api/guest/tickets/order',
        id: orderStorage.id,
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
          // Очистка стора и хранилища
          dispatch(setToInitialDataBuyingSlice());
          dispatch(setToInitialDataOrderSlice());
          dispatch(setToInitialDataTicketSlice());

          navigate("../schedule/" + dayjs().format('YYYY-MM-DD'));
        }}>
          Вернуться на главную
        </button>
        <section className="buying">
          <br />
          <h2>Упс, что-то сломалось :( Проносим Вам свои извинения.</h2>
          <p>
            <span>Ваши билеты оформлены, чтобы их увидеть попробуйте обновить страницу.</span>
            <br />
            <span>Если проблема не устранена - обратитесь, пожалуйста, в техническую поддержку. Мы обязательно Вам поможем!</span>
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
          // Очистка стора и хранилища
          dispatch(setToInitialDataBuyingSlice());
          dispatch(setToInitialDataOrderSlice());
          dispatch(setToInitialDataTicketSlice());

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

  if (!orderRedux && !hallRedux && !movieRedux && !sessionRedux) {

    return (
      <main>
        <button 
          style={{padding: '5px', marginBottom: '10px'}} 
          onClick={() => {
          // Очистка стора и хранилища
          dispatch(setToInitialDataBuyingSlice());
          dispatch(setToInitialDataOrderSlice());
          dispatch(setToInitialDataTicketSlice());

          navigate("../schedule/" + dayjs().format('YYYY-MM-DD'));
        }}>
          Вернуться на главную
        </button>
        <section className="buying">
          <h2>Не так быстро :)</h2>
          <p>
            <span>Сначала нужно выбрать сеанс, выбрать место, оплатить заказ, а потом уже пытаться увидеть всю информацию.</span>
            <br />
            <Link to={`../schedule/${dayjs().format('YYYY-MM-DD')}`}>Показать сеансы на текущую дату?</Link>
          </p>
        </section>
      </main>
    )
  }
  return (
    <Ticket />
  )
}

export default TicketCheck