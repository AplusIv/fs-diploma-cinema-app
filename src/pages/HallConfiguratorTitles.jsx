/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";

const HallConfiguratorTitles = ({ name, handleChange }) => {
  // redux prices 
  const hallsRedux = useSelector(state => state.hallPricesReducer.halls);

  const selectedHallIdInPriceConfigurator = useSelector(state => state.hallPricesReducer.selectedHallId);
  const selectedHallIdInHallConfigurator = useSelector(state => state.hallPLacesReducer.selectedHallId);

  let selectedHallId;

  switch (name) {
    case 'prices-hall':
      selectedHallId = selectedHallIdInPriceConfigurator;
      break;
    case 'chairs-hall':
      selectedHallId = selectedHallIdInHallConfigurator;
      break;

    default:
      break;
  }

  return (
    <ul className="conf-step__selectors-box" >
      { hallsRedux.map(hall => (
        <li key={ hall.id }>
          <input 
            type="radio" 
            className="conf-step__radio" 
            name={ name } 
            value={ hall.title }
            onChange={handleChange}
            checked={selectedHallId === hall.id}
          />
          
          <span className="conf-step__selector">{ hall.title }</span>
        </li>)
      ) }
    </ul>
  )
}

export default HallConfiguratorTitles