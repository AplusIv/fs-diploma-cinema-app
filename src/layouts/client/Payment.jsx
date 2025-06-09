import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { putNewOrderAndTickets } from "../../redux/slices/orderSlice";
import { setToInitialData as setToInitialDataBuyingSlice } from "../../redux/slices/buyingSlice";
import { setToInitialData as setToInitialDataTicketSlice } from "../../redux/slices/ticketSlice";
import { setToInitialData as setToInitialDataOrderSlice } from "../../redux/slices/orderSlice";
import dayjs from "dayjs";

const Payment = () => {

  const hallRedux = useSelector(state => state.buyingReducer.hall);
  const movieRedux = useSelector(state => state.buyingReducer.movie);
  const sessionRedux = useSelector(state => state.buyingReducer.session);
  const orderRedux = useSelector(state => state.orderReducer.newOrder);
  const placesByHallRedux = useSelector(state => state.buyingReducer.placesByHall);
  const newOrderTicketsRedux = useSelector(state => state.ticketsReducer.newOrderTickets);

  // logs
  // console.log({ orderRedux });
  // console.log({ newOrderTicketsRedux });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // console.log('Payment page effect is on');

    // заказ оплачен -> показать страницу с qr кодом
    if (orderRedux.is_paid === true) {
      console.log('new order data changed');
      navigate("../ticket");
    }
  }, [orderRedux]);

  const handleOrderPay = () => {
    const updateOrderData = { ...orderRedux, is_paid: true };
    dispatch(putNewOrderAndTickets(updateOrderData));
  }

  return (
    <main>
      <button
        style={{ padding: '5px', marginBottom: '10px' }}
        onClick={() => {
          // Очистка стора и хранилища
          dispatch(setToInitialDataBuyingSlice());
          dispatch(setToInitialDataOrderSlice());
          dispatch(setToInitialDataTicketSlice());

          navigate("../schedule/" + dayjs().format('YYYY-MM-DD'));
        }}>
        Вернуться на главную
      </button>

      <section className="ticket">

        <header className="tichet__check">
          <h2 className="ticket__check-title">Вы выбрали билеты:</h2>
        </header>

        <div className="ticket__info-wrapper">
          <p className="ticket__info">На фильм: <span className="ticket__details ticket__title">{movieRedux.title}</span></p>
          <p className="ticket__info">Места:
            <span className="ticket__details ticket__chairs">
              <br></br>
              {newOrderTicketsRedux.map((ticket, index) => {
                const placeId = ticket.place_id;
                const bookedPlace = placesByHallRedux.find(place => place.id === placeId);
                // console.log({ bookedPlace });
                return (<span key={bookedPlace.id}>{++index}) ряд: {bookedPlace.row}, место: {bookedPlace.place}, статус билета: {ticket.status === 'booked' ? 'забронирован' : 'не выбран'}<br /></span>)
              })}
            </span>
          </p>
          <p className="ticket__info">В зале: <span className="ticket__details ticket__hall">{hallRedux.title}</span></p>
          <br />
          <br />
          <p className="ticket__info">Дата сеанса: <span className="ticket__details ticket__date">{dayjs(sessionRedux.date).format('DD.MM.YYYY')}</span></p>
          <p className="ticket__info">Начало сеанса: <span className="ticket__details ticket__start">{sessionRedux.time}</span></p>
          <p className="ticket__info">Стоимость: <span className="ticket__details ticket__cost">{orderRedux.sum.toFixed(2)}</span> рублей</p>

          <button className="acceptin-button" onClick={handleOrderPay} >Получить код бронирования</button>
          <p className="ticket__hint">После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал.</p>
          <p className="ticket__hint">Приятного просмотра!</p>
        </div>
      </section>
    </main>
  )
}

export default Payment