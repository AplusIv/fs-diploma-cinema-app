/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { changeData, setToInitialData } from "../redux/slices/popupAddMovieHandlerSlice";
import PopupInput from "./PopupInput";
import PopupTextarea from "./PopupTextarea";
import PopupFileInput from "./PopupFileInput";

const PopupMovieAdding = ({ buttonTitle, onAddCallback, handlePopup }) => {
  const popupData = useSelector(state => state.popupAddMovieReducer.popupAddMovieData);
  console.log({ popupData });

  const dispatch = useDispatch();


  const handleAddData = (e) => {
    e.preventDefault();
    console.log('добавление нового элемента в массив');
    onAddCallback(popupData);

    handlePopup('hide popup');
    dispatch(setToInitialData());
  }

  const onChangeItemData = (editedValue, name) => {
    dispatch(changeData({ property: name, value: editedValue }));
  }

  return (
    <form onSubmit={handleAddData}>
      <div className="popup__row">
        <label>
          Название фильма:{' '}
          <PopupInput
            belongsTo='add movie'
            name="title"
            type="text"
            placeholder="Название фильма"
            autoComplete="on"
            // edit={!edit}
            onChangeCallback={onChangeItemData} />
        </label>
      </div>

      <div className="popup__row">
        <label>
          Описание фильма:{' '}
          <PopupTextarea
            belongsTo='add movie'
            name="description"
            rows="5"
            cols="33"
            placeholder="Введите описание фильма"
            autoComplete="on"
            onChangeCallback={onChangeItemData} />
        </label>
      </div>

      <div className="popup__row">
        <label>
          Длительность фильма:{' '}
          <PopupInput
            belongsTo='add movie'
            type="number" // всё-таки длительность фильма это число
            name="duration"
            placeholder="Длительность фильма"
            autoComplete="on"
            onChangeCallback={onChangeItemData} />
        </label>
      </div>

      <div className="popup__row">
        <label>
          Название страны:{' '}
          <PopupInput
            belongsTo='add movie'
            type="text"
            name="country"
            placeholder="Название страны"
            autoComplete="on"
            onChangeCallback={onChangeItemData} />
        </label>
      </div>

      <div className="popup__row">
        <label>
          Постер к фильму:{' '}
          <PopupFileInput
            belongsTo='add movie'
            type="file"
            name="poster"
            autoComplete="on"
            required={true}
            onChangeCallback={onChangeItemData} />
        </label>
      </div>

      {/* <div className="popup__row">
        <label>
          Постер к фильму:{' '}
          <PopupInput
            belongsTo='add movie'
            type="file"
            name="poster"
            autoComplete="on"
            onChangeCallback={onChangeItemData} />
        </label>
      </div> */}

      <button type="submit" className="conf-step__button conf-step__button-accent" onSubmit={handleAddData}>{buttonTitle}</button>
    </form>
  )
}

export default PopupMovieAdding