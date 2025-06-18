import { useEffect, useState } from "react";
import SectionHeader from "./SectionHeader";
import { useDispatch, useSelector } from "react-redux";
import { putToggleSessionsSalesActive } from "../redux/slices/sessionSlice";

const SellsConfigurator = () => {
  const [isActiveHeaderState, setIsActiveHeaderState] = useState(true);
  const toggleSectionVisibility = () => {
    setIsActiveHeaderState(!isActiveHeaderState);
  }

  const [loading, setLoading] = useState(false);

  const sessionsRedux = useSelector(state => state.sessionsReducer.sessions);
  console.log({ sessionsRedux });

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(false);
  }, [sessionsRedux])

  const handleActiveSales = () => {
    console.log('toggle sales');
    setLoading(true);

    dispatch(putToggleSessionsSalesActive('api/sessions/sales/is_active'));
  }

  const activeSalesState = sessionsRedux.every(session => session.is_sales_active == true); // session.is_sales_active = 0 || 1
  console.log({ activeSalesState });

  const activeSessions = sessionsRedux.filter(session => session.is_sales_active == true);
  const inActiveSessions = sessionsRedux.filter(session => session.is_sales_active == false);

  return (
    <section className="conf-step">
      <SectionHeader name={'Открыть продажи'} isActiveHeaderState={isActiveHeaderState} handleClick={toggleSectionVisibility} />
      <div className="conf-step__wrapper text-center">
        <p className="conf-step__paragraph">Всё готово, теперь можно:</p>
        {
          // activeSalesState
          // Если большинство сеансов с активным статусом покупки
          (activeSessions.length > inActiveSessions.length)
            ? <button className="conf-step__button conf-step__button-warning" onClick={handleActiveSales} disabled={loading}>Приостановить продажу билетов</button>
            : <button className="conf-step__button conf-step__button-accent" onClick={handleActiveSales} disabled={loading}>Открыть продажу билетов</button>
        }
      </div>
    </section>
  )
}

export default SellsConfigurator