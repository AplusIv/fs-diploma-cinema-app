import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { setDays, setSelectedDate } from "../../redux/slices/pageNavigatorSlice";

// dayjs
import dayjs from "dayjs";
// обновить дни недели на русском
import updateLocale from 'dayjs/plugin/updateLocale'; // ES 2015
dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
  weekdays: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]
});

// import { nanoid } from "nanoid";

const PageNavigator = () => {
  const { date } = useParams();
  // console.log('page navigator date: ', date);

  // redux
  const daysRedux = useSelector(state => state.pageNavigatorReducer.days);
  const selectedDayIndexRedux = useSelector(state => state.pageNavigatorReducer.selectedDayIndex);
  const selectedDateRedux = useSelector(state => state.pageNavigatorReducer.selectedDate);
  const firstDayRedux = useSelector(state => state.pageNavigatorReducer.daysIntervalIndexes.firstDay);

  // console.log({ daysRedux });
  // console.log({ selectedDayIndexRedux });
  // console.log({ selectedDateRedux });
  // console.log({ firstDayRedux });

  const dispatch = useDispatch();

  useEffect(() => {
      // console.log('Page Navigator effect is on');
      // заполнение начальными данными из сервера
      dispatch(setSelectedDate(date));
      dispatch(setDays(date));
    }, [date]);

  const getNextPeriodDay = (date, paginateStep) => {
    const recentDate = dayjs(date);
    const nextDate = recentDate.add(paginateStep, 'day');

    return nextDate.format('YYYY-MM-DD');    
  }

  const getPreviousPeriodDay = (date, paginateStep) => {
    const recentDate = dayjs(date);
    const prevDate = recentDate.subtract(paginateStep, 'day');

    return prevDate.format('YYYY-MM-DD');    
  }

  const now = dayjs();
  console.log('is it today: ', dayjs().isSame(now, 'day'));
  
  return (
    <nav className="page-nav">
      {firstDayRedux > 0 && <NavLink 
        to={`../schedule/${getPreviousPeriodDay(selectedDateRedux, 6)}`}
        className="page-nav__day page-nav__day_before"
      >
      </NavLink>}
      {daysRedux && daysRedux.map((day, index) => (       
        (day.isSame(now, 'day')) ? 
        <NavLink  
          key={day.format('YYYY-MM-DD')} 
          to={`../schedule/${daysRedux && daysRedux[index].format('YYYY-MM-DD')}`}
          index={index} 
          className={selectedDayIndexRedux === index ? 'page-nav__day page-nav__day_today page-nav__day_chosen' : 'page-nav__day page-nav__day_today'}
        >
        <span className="page-nav__day-week">{day.format('dd')}</span>
        <span className="page-nav__day-number">{day.format('D')}</span>
      </NavLink> : 
        <NavLink 
          key={day.format('YYYY-MM-DD')} 
          to={`../schedule/${daysRedux && daysRedux[index].format('YYYY-MM-DD')}`}
          index={index} 
          className={selectedDayIndexRedux === index ? 'page-nav__day page-nav__day_chosen' : 'page-nav__day'}
        >
          <span className="page-nav__day-week">{day.format('dd')}</span>
          <span className="page-nav__day-number">{day.format('D')}</span>
        </NavLink>
      ))}
      <NavLink 
        className="page-nav__day page-nav__day_next"
        to={`../schedule/${getNextPeriodDay(selectedDateRedux, 6)}`}
      >
      </NavLink>
    </nav>
  )
}

export default PageNavigator