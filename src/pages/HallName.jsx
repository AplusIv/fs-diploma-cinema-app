/* eslint-disable react/prop-types */
const HallName = ({ hall, handleDeleteHall }) => {
  return (
    <li>{hall.title}{' '}
      <button className="conf-step__button conf-step__button-trash" onClick={() => handleDeleteHall(hall.id)}></button>
    </li>
  )
}

export default HallName