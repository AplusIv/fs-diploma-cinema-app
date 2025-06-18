/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";

const PopupTextarea = ({
  belongsTo,
  name,
  rows,
  cols,
  placeholder = "",
  autoComplete,
  edit = true,
  onChangeCallback
}) => {
  const hallDataValue = useSelector(state => state.hallPopupDataReducer.hallPopupData[name]); // имя поля из импута соответствует свойству объекта из состояния
  const editMovieDataValue = useSelector(state => state.popupEditMovieReducer.popupEditedMovieData[name]); // имя поля из импута соответствует свойству объекта из состояния
  const addMovieDataValue = useSelector(state => state.popupAddMovieReducer.popupAddMovieData[name]); // имя поля из импута соответствует свойству объекта из состояния

  let value;

  switch (belongsTo) {
    case 'add hall':
      value = hallDataValue;
      break;
    case 'edit movie':
      value = editMovieDataValue;
      break;
    case 'add movie':
      value = addMovieDataValue;
      break;

    default:
      break;
  }

  return (
    <textarea
      className="popup__input"
      name={name}
      rows={rows}
      cols={cols}
      value={value}
      placeholder={placeholder}
      autoComplete={autoComplete}
      onChange={(e) => {
        onChangeCallback && onChangeCallback(e.target.value, name)
      }}
      disabled={!edit}
      required
      minLength={10}
    >
    </textarea>
  )
}

export default PopupTextarea;