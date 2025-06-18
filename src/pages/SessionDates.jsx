/* eslint-disable react/prop-types */
import { nanoid } from "nanoid";

const SessionDates = ({ days, date, handleChangeDate }) => {
  return (
    <ul className="conf-step__selectors-box" >
      { days && days.map(day => (
        <li key={ nanoid() }>
          <input 
            type="radio" 
            name="session-dates"
            className="conf-step__radio" 
            value={ day.format('YYYY-MM-DD') }
            onChange={handleChangeDate}
            checked={date === day.format('YYYY-MM-DD') ? true : false}
          />          
          <span className="conf-step__selector">{ day.format('DD.MM.YYYY') }</span>
        </li>)
      ) }
    </ul>
  )
}

export default SessionDates