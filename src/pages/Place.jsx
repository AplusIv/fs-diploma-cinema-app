/* eslint-disable react/prop-types */
const Place = ({ place, handlePlaceType }) => {
  const placeType = place.type;
  return (
    <span className={"conf-step__chair conf-step__chair_" + placeType} onClick={() => handlePlaceType(place.id)}><h3>{place.id}</h3></span>
  )
}

export default Place