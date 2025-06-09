import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPlacesByHall, setSelectedPlaces, setToInitialData } from "../../redux/slices/buyingSlice";
import { compareFnByPlaceAssending } from "../../services/sorterFunctions";
import { prepareHallPlaces } from "../../services/buyingPlacesFunctions";
import { postNewOrder } from "../../redux/slices/orderSlice";
import BuyingPlace from "./BuyingPlace";
import Tooltip from "./Tooltip";

import dayjs from "dayjs";
import { nanoid } from "nanoid";

const Buying = () => {
  const ticketsRedux = useSelector(state => state.ticketsReducer.tickets);
  const placesByHallRedux = useSelector(state => state.buyingReducer.placesByHall);
  const selectedPlacesRedux = useSelector(state => state.buyingReducer.selectedPlaces);
  const hallRedux = useSelector(state => state.buyingReducer.hall);
  const movieRedux = useSelector(state => state.buyingReducer.movie);
  const sessionRedux = useSelector(state => state.buyingReducer.session);
  const orderRedux = useSelector(state => state.orderReducer.newOrder);

  // logs
  // console.log({ hallRedux });
  // console.log({ movieRedux });
  // console.log({ sessionRedux });
  // console.log({ orderRedux });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // console.log('Buying page effect 2 is on');

    if (orderRedux) {
      // появился новый заказ -> перейти к оплате
      navigate("../payment");
    }
  }, [orderRedux]);

  const [tooltip, setTooltip] = useState({
    text: '',
    active: false
  });


  // выбранные места
  const buyingPlaces = prepareHallPlaces(placesByHallRedux, hallRedux, compareFnByPlaceAssending);

  // Билеты для добавления в DB при обработке кнопки "Забронировать"
  const handleTicketBooking = () => {
    if (selectedPlacesRedux.length > 0) {
      const ticketsToAddInDB = selectedPlacesRedux.map(selectedPlace => {
        return {
          place_id: selectedPlace.id,
          session_id: sessionRedux.id,
          status: 'booked',
        }
      });
      dispatch(postNewOrder(ticketsToAddInDB)); // создание нового заказа
    } else {
      const err = "Места не выбраны. Для оформления заказа нужно выбрать места";
      setTooltip({
        text: err,
        active: true
      });
      setTimeout(() => {
        setTooltip({
          text: '',
          active: false
        });
      }, 2000);

      throw new Error(err);
    }
  }

  const currency = 'руб';

  const handlePlaceSelected = (placeId) => {
    const modifiedPlaces = placesByHallRedux.map(place => {
      if (place.id === placeId) {
        console.log({ placeId });

        let chosenPlace = { ...place }; // копия исходного объекта, чтобы не перезаписать его

        if (place.type === 'standart' || place.type === 'vip') {
          chosenPlace.is_selected = !place.is_selected;
        }
        return chosenPlace;
      } else {
        return place;
      }
    })

    const selectedPlaces = [...modifiedPlaces].filter(place => place.is_selected === true);
    // console.log({selectedPlaces});

    dispatch(setPlacesByHall(modifiedPlaces));
    dispatch(setSelectedPlaces(selectedPlaces));
  }

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
      <br/>
      {/* <Link to={"../schedule/" + dayjs().format('YYYY-MM-DD')}><h1>На главную</h1></Link> */}
      <section className="buying">
        <div className="buying__info">
          <div className="buying__info-description">
            <h2 className="buying__info-title">{movieRedux.title}</h2>
            <p className="buying__info-start">Начало сеанса: {sessionRedux.time}</p>
            <p className="buying__info-hall">{hallRedux.title}</p>
          </div>
        </div>
        <div className="buying-scheme">
          <div className="buying-scheme__wrapper">
            {buyingPlaces.map(row => <div key={nanoid()} className="buying-scheme__row">
              {row.map(place => (<BuyingPlace
                key={nanoid()}
                place={place}
                handlePlaceSelected={handlePlaceSelected}
                tickets={ticketsRedux.filter(ticket => ticket.session_id === sessionRedux.id)}
              />))}
            </div>)}
          </div>
          <div className="buying-scheme__legend">
            <div className="col">
              <p className="buying-scheme__legend-price">
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span> Свободно
                (<span className="buying-scheme__legend-value">{hallRedux.normal_price.toFixed(2)}</span> {currency})
              </p>
              <p className="buying-scheme__legend-price">
                <span className="buying-scheme__chair buying-scheme__chair_vip"></span> Свободно VIP
                (<span className="buying-scheme__legend-value">{hallRedux.vip_price.toFixed(2)}</span> {currency})
              </p>
            </div>
            <div className="col">
              <p className="buying-scheme__legend-price">
                <span className="buying-scheme__chair buying-scheme__chair_taken"></span> Занято
              </p>
              <p className="buying-scheme__legend-price">
                <span className="buying-scheme__chair buying-scheme__chair_selected"></span> Выбрано
              </p>
            </div>
          </div>
        </div>
        <button className="acceptin-button" onClick={handleTicketBooking}>Забронировать</button>

        {tooltip.active && <Tooltip text={tooltip.text} />}
      </section>
    </main>
  )
}

export default Buying