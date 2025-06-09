/* eslint-disable react/prop-types */
const BuyingPlace = ({ place, handlePlaceSelected, tickets }) => {
  const placeType = place.type;
  const placeSelected = place.is_selected;

  const isPlaceTaken = (tickets, place) => {
    return !!tickets.find(ticket => ticket.place_id === place.id && ticket.status === 'paid'); // Если место занято => вернуть true
  }

  return (
    placeSelected && placeType !== 'disabled' ? <span className={"buying-scheme__chair buying-scheme__chair_" + "selected"} onClick={() => handlePlaceSelected(place.id)}><h3>{place.id}</h3></span>
      : (isPlaceTaken(tickets, place)) ? <span className={"buying-scheme__chair buying-scheme__chair_" + "disabled"}><h3>{place.id}</h3></span>
        : <span className={"buying-scheme__chair buying-scheme__chair_" + placeType} onClick={() => handlePlaceSelected(place.id)}><h3>{place.id}</h3></span>
  )
}

export default BuyingPlace