/* eslint-disable react/prop-types */
import PopupInput from "./PopupInput";
import { useDispatch, useSelector } from "react-redux";
import { changeData } from "../redux/slices/hallPopupDataHandlerSlice";


const PopupHallAdding = ({ buttonTitle, onAddCallback, handlePopup }) => {
  // redux newHall data 
  const hallPopupData = useSelector(state => state.hallPopupDataReducer.hallPopupData);

  const dispatch = useDispatch();

  const handleAddData = (e) => {
    e.preventDefault();
    console.log('добавление нового элемента в массив');
    onAddCallback(hallPopupData);

    handlePopup('hide popup');
  }

  const onChangeItemData = (editedValue, name) => {
    // redux
    dispatch(changeData({property: name, value: editedValue}));
  }

  return (
    <form onSubmit={handleAddData}>
      <div className="popup__row add-item">
        <label>Название зала:{' '}
          <PopupInput
            belongsTo={'add hall'}
            name="title"
            type="text"
            autoComplete="on"
            placeholder="Введите название зала"
            onChangeCallback={onChangeItemData} />
        </label>
        <button type="submit" className="conf-step__button conf-step__button-accent" onSubmit={handleAddData}>{buttonTitle}</button>
      </div>
    </form>
  )
}

export default PopupHallAdding