import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { setToInitialData as setToInitialDataBuyingSlice } from "../../redux/slices/buyingSlice";
import { setToInitialData as setToInitialDataTicketSlice } from "../../redux/slices/ticketSlice";
import { setToInitialData as setToInitialDataOrderSlice } from "../../redux/slices/orderSlice";

import QRCode from "react-qr-code"
import dayjs from "dayjs";

const Ticket = () => {
  
  const hallRedux = useSelector(state => state.buyingReducer.hall);
  const movieRedux = useSelector(state => state.buyingReducer.movie);
  const sessionRedux = useSelector(state => state.buyingReducer.session);
  const orderRedux = useSelector(state => state.orderReducer.newOrder);
  const placesByHallRedux = useSelector(state => state.buyingReducer.placesByHall);
  const newOrderTicketsRedux = useSelector(state => state.ticketsReducer.newOrderTickets);

  // логи
  // console.log({ orderRedux });
  // console.log({ newOrderTicketsRedux });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let ticketsStr = ''; // строка с данными о билетах для передачи в qr code

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

      <section className="ticket">

        <header className="tichet__check">
          <h2 className="ticket__check-title">Электронный билет</h2>
        </header>

        <div className="ticket__info-wrapper">
          <p className="ticket__info">На фильм: <span className="ticket__details ticket__title">{movieRedux.title}</span></p>
          <p className="ticket__info">Места:
            <span className="ticket__details ticket__chairs">
              <br></br>
              {newOrderTicketsRedux.map((ticket, index) => {
                const placeId = ticket.place_id;
                const bookedPlace = placesByHallRedux.find(place => place.id === placeId);
                // console.log({bookedPlace});                
                ticketsStr += `${++index}) ticket id: ${ticket.id}, row: ${bookedPlace.row}, place: ${bookedPlace.place}, status: ${ticket.status}.\n` // для вывода в qr коде
                return (<span key={bookedPlace.id}>{++index}) id билета: {ticket.id}, ряд: {bookedPlace.row}, место: {bookedPlace.place}, статус билета: {ticket.status === 'paid' ? 'оплачен' : 'не оплачен'}<br/></span>)
              })}
            </span>
          </p>
          <p className="ticket__info">В зале: <span className="ticket__details ticket__hall">{hallRedux.title}</span></p>
          <br/>
          <br/>
          <p className="ticket__info">Дата сеанса: <span className="ticket__details ticket__date">{dayjs(sessionRedux.date).format('DD.MM.YYYY')}</span></p>
          <p className="ticket__info">Начало сеанса: <span className="ticket__details ticket__start">{sessionRedux.time}</span></p>
          {<QRCode className="ticket__info-qr" value={`Order # ${orderRedux.id} is paid.\n` + ticketsStr } />}
          <p className="ticket__hint">Покажите QR-код нашему контроллеру для подтверждения бронирования.</p>
          <p className="ticket__hint">Приятного просмотра!</p>
        </div>
      </section>
    </main>
  )
}

export default Ticket