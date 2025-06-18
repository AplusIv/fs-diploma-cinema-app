/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { changeData, setToInitialData } from "../redux/slices/popupAddSessionHandlerSlice";
import PopupSelect from "./PopupSelect";
import PopupInput from "./PopupInput";


const PopupNewDataAdding2 = ({
  halls,
  movies,
  buttonTitle,
  onAddCallback,
  edit
}) => {
  // redux added session data 
  const popupData = useSelector(state => state.popupAddSessionReducer.popupAddSessionData);

  const dispatch = useDispatch();

  const handleAddData = (e) => {
    e.preventDefault();

    console.log('добавление нового элемента в массив');
    // redux
    onAddCallback(popupData);
    dispatch(setToInitialData());
  }

  const onChangeItemData = (editedValue, name) => {
    dispatch(changeData({ property: name, value: editedValue }))
  }

  return (
    <form onSubmit={handleAddData}>
      <div className="popup__row add-item">
        <label> Зал:{' '}
          <PopupSelect
            belongsTo='add session'
            optionsData={halls}
            name="hall_id"
            edit={!edit}
            onChangeCallback={onChangeItemData}
          />
        </label>
        <label> Фильм:{' '}
          <PopupSelect
            belongsTo='add session'
            optionsData={movies}
            name="movie_id"
            edit={!edit}
            onChangeCallback={onChangeItemData}
          />
        </label>
        <label>Время сеанса:{' '}
          <PopupInput
            belongsTo='add session'
            name="time"
            type="time"
            autoComplete="on"
            edit={!edit}
            onChangeCallback={onChangeItemData} />
        </label>
        <label>Дата сеанса:{' '}
          <PopupInput
            belongsTo='add session'
            name="date"
            type="date"
            autoComplete="on"
            edit={!edit}
            onChangeCallback={onChangeItemData} />
        </label>
        <button type="submit" className="conf-step__button conf-step__button-accent" onSubmit={handleAddData}>{buttonTitle}</button>
      </div>
    </form>
  )
}

export default PopupNewDataAdding2