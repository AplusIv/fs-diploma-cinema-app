/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { changeData } from "../redux/slices/popupEditMovieHandlerSlice";
import { hidePopup } from "../redux/slices/popupSlice";
import PopupInput from "./PopupInput";
import PopupTextarea from "./PopupTextarea";
import PopupFileInput from "./PopupFileInput";

const PopupChangeForm = ({onChangeCallback, buttonTitle, onDeleteCallback }) => {
  // redux edited movie data 
  const popupData = useSelector(state => state.popupEditMovieReducer.popupEditedMovieData);
  console.log({popupData});
  
  const dispatch = useDispatch();

  const handleData = (e) => {
    e.preventDefault();
    console.log('изменение элемента в массиве');
    onChangeCallback(popupData, popupData.id);

    dispatch(hidePopup());
  }

  const handleDelete = () => {  
    onDeleteCallback(popupData);
    dispatch(hidePopup());
  }

  const onChangeItemData = (editedValue, name) => {
    dispatch(changeData({property: name, value: editedValue}));
  }

  return (
    <form onSubmit={handleData}>
      <div className="popup__row">
        <label> Название:{' '}
          <PopupInput
            belongsTo={'edit movie'}
            name="title"
            type="text"
            placeholder="Название фильма"
            autoComplete="on"
            edit={true}
            onChangeCallback={onChangeItemData} />
        </label>
      </div>
      <div className="popup__row">
        <label> Описание:{' '}
          <PopupTextarea
            belongsTo={'edit movie'}
            name="description"
            placeholder="Название фильма"
            autoComplete="on"
            edit={true}
            onChangeCallback={onChangeItemData} />
        </label>
      </div>
      <div className="popup__row">
        <label> Длительность, мин:{' '}
          <PopupInput
            belongsTo={'edit movie'}
            name="duration"
            type="number"
            placeholder="Название фильма"
            autoComplete="on"
            edit={true}
            onChangeCallback={onChangeItemData} />
        </label>
      </div>
      <div>
        <label> Производство:{' '}
          <PopupInput
            belongsTo={'edit movie'}
            name="country"
            type="text"
            placeholder="Производство фильма"
            autoComplete="on"
            edit={true}
            onChangeCallback={onChangeItemData} />
        </label>
      </div>
      <div>
        <label>
          Постер к фильму:{' '}
          <PopupFileInput
            belongsTo={'edit movie'}
            type="file"
            name="poster"
            autoComplete="on"
            required={false}
            onChangeCallback={onChangeItemData} />
        </label>
      </div>
      <button type="submit" className="conf-step__button conf-step__button-accent" onSubmit={handleData}>{buttonTitle}</button>

      <button type="button" className="conf-step__button conf-step__button-warning" onClick={handleDelete}>Удалить фильм</button>
    </form>
  )
}

export default PopupChangeForm