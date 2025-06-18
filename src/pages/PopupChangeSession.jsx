/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { changeData, filterData, setHalls, setSelectedSession } from "../redux/slices/popupEditSessionsHandlerSlice";
import PopupInput from "./PopupInput";
import PopupSelect from "./PopupSelect";


const PopupChangeSession = ({ halls, onChangeCallback, onDeleteCallback, selectedIndex }) => {
  
  const sessionRedux = useSelector(state => state.popupEditSessionsReducer.popupEditSessionsData[selectedIndex]);
  const sessionsRedux = useSelector(state => state.popupEditSessionsReducer.popupEditSessionsData);
  const editedSessionIndex = useSelector(state => state.popupEditSessionsReducer.popupSelectedSession);

  const dispatch = useDispatch();

  const sessionEditFlag = selectedIndex === editedSessionIndex;

  const handleData = () => {
    console.log('изменение элемента в массиве');
    onChangeCallback(sessionsRedux[editedSessionIndex], sessionsRedux[editedSessionIndex].id);
  }

  const handleDelete = () => {
    onDeleteCallback(sessionRedux);
    dispatch(filterData({ id: sessionRedux.id })); // удаление сеансов из разметки
  }

  const onChangeItemData = (editedValue, name) => {
    dispatch(changeData({ property: name, value: editedValue }));
  }

  return (
    <>
      <li className="popup__row">
        <label> Зал:{' '}
          {<PopupSelect
            belongsTo="edit session"
            selectedIndex={selectedIndex}
            optionsData={halls}
            name="hall_id"
            edit={sessionEditFlag}
            onChangeCallback={onChangeItemData} />}
        </label>
        <label>Время сеанса:{' '}
          <PopupInput
            belongsTo="edit session"
            selectedIndex={selectedIndex}
            name="time"
            type="time"
            autoComplete="on"
            edit={sessionEditFlag}
            onChangeCallback={onChangeItemData} />
        </label>
        <label>Дата сеанса:{' '}
          <PopupInput
            belongsTo="edit session"
            selectedIndex={selectedIndex}
            name="date"
            type="date"
            autoComplete="on"
            edit={sessionEditFlag}
            onChangeCallback={onChangeItemData} />
        </label>

        {sessionEditFlag ?
          <button className="conf-step__button conf-step__button-regular" onClick={() => {
            handleData();
            dispatch(setSelectedSession(undefined));
          }}>Принять изменения</button>
          : <button className="conf-step__button conf-step__button-regular" onClick={() => {
            dispatch(setHalls(halls));
            dispatch(setSelectedSession(selectedIndex));
          }}>Редактировать сеанс</button>}

        <button type="button" className="conf-step__button conf-step__button-warning" onClick={handleDelete} >Удалить сеанс</button>
      </li>
    </>
  )
}

export default PopupChangeSession