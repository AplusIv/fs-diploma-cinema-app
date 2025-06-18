/* eslint-disable react/prop-types */
import { useState } from "react";
import PopupInput from "./PopupInput";
// import PopupTextarea from "./PopupTextarea";
import PopupSelect from "./PopupSelect";

// компонент не использовался в обновлённой версии проекта

const PopupChangeSessionsForm = ({ editedElement, halls, onChangeCallback }) => {
  const [newItem, setNewItem] = useState(editedElement);
  console.log({ newItem });

  // редактируемый зал
  const initialHallTitle = halls.find(hall => hall.id === newItem.hall_id).title;

  const [edit, setEdit] = useState(false);

  const handleData = () => {
    console.log('изменение элемента в массиве');
    onChangeCallback(newItem, newItem.id);

    // setNewItem({});
    // setAdding(false);
    // handlePopup('hide popup');
  }

  const onChangeItemData = (editedValue, name) => {
    if (name === "hall_id") {
      const editedHallId = halls.find(hall => hall.title === editedValue).id;
      setNewItem({ ...newItem, [name]: editedHallId });
    } else {
      setNewItem({ ...newItem, [name]: editedValue });
    }
  }

  return (
    <>
      <li className="popup__row">
        <label> Зал:{' '}
          {<PopupSelect
            // info={sessionInfo}
            initialValue={initialHallTitle}
            optionsData={halls}
            name="hall_id"
            edit={edit}
            onChangeCallback={onChangeItemData} />}
        </label>
        <label>Время сеанса:{' '}
          <PopupInput
            // info={sessionInfo}
            initialValue={editedElement.time}
            name="time"
            type="time"
            autoComplete="on"
            edit={edit}
            onChangeCallback={onChangeItemData} />
        </label>
        {edit ?
          <button className="conf-step__button conf-step__button_regular" onClick={() => {
            setEdit(!edit);
            handleData();
          }}>Принять изменения</button>
          : <button className="conf-step__button conf-step__button_regular" onClick={() => setEdit(!edit)}>Редактировать сеанс</button>}
      </li>
    </>
  )
}

export default PopupChangeSessionsForm