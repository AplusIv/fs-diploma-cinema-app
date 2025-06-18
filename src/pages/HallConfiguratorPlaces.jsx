/* eslint-disable react/prop-types */
import Place from "./Place";
import { nanoid } from "nanoid";

const HallConfiguratorPlaces = ({ places, handlePlaceType }) => {

  return (
    <div className="conf-step__hall-wrapper">
      {places.map(row => <div key={nanoid()} className="conf-step__row">
        {row.map(place => <Place key={nanoid()} place={place} handlePlaceType={handlePlaceType}/>)}
      </div>)}
    </div> 
  )
}

export default HallConfiguratorPlaces