import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import HallName from "./HallName";
import SectionHeader from "./SectionHeader";
import Popup4 from "./Popup4";

import { addHall, hidePopup } from "../redux/slices/hallPopupSlice";
import { deleteHall, postHallData, setToInitialData } from "../redux/slices/hallPopupDataHandlerSlice";

const HallManager = () => {

  const [isActiveHeaderState, setIsActiveHeaderState] = useState(true);
  const toggleSectionVisibility = () => {
    setIsActiveHeaderState(!isActiveHeaderState);
  }

  // redux popupInfo
  const hallPopupInfoRedux = useSelector(state => state.hallPopupInfoReducer.hallPopupInfo);

  const hallsRedux = useSelector(state => state.hallsReducer.halls);
  const hallsReduxLoading = useSelector(state => state.hallsReducer.loading);
  // console.log({ hallsReduxLoading });

  const dispatch = useDispatch();

  // popup handlers
  const addHallCallback = useCallback(() => dispatch(addHall()), []);
  const hidePopupCallback = useCallback(() => {
    dispatch(hidePopup());
    dispatch(setToInitialData());
  }, []);

  const handlePopupStatus = (status) => {
    if (status === 'adding hall popup') {
      // redux
      addHallCallback();
      // () => dispatch(addHall())(); // IIFE
      // dispatch(addHall());
    }
    if (status === 'hide popup') {
      hidePopupCallback();
    }
  }

  const handleAddData = (newData) => {
    dispatch(postHallData(newData));
  }

  const handleDeleteHall = (id) => {
    dispatch(deleteHall({ id }));
  }

  if (hallsReduxLoading !== 'idle') {
    return (
      <section className="conf-step" >
        <SectionHeader name={'Управление залами'} isActiveHeaderState={isActiveHeaderState} handleClick={toggleSectionVisibility} />
        <div className="conf-step__wrapper">
          <span className="loader" ></span>
        </div>
      </section>
    )
  }

  return (
    <section className="conf-step" >
      <Popup4
        popupInfo={hallPopupInfoRedux}
        halls={hallsRedux}
        onAddCallback={handleAddData}
        handlePopup={handlePopupStatus}
      />

      <SectionHeader name={'Управление залами'} isActiveHeaderState={isActiveHeaderState} handleClick={toggleSectionVisibility} />

      {<div className="conf-step__wrapper">
        <p className="conf-step__paragraph">Доступные залы:</p>
        <ul className="conf-step__list">
          {hallsRedux.map(hall => (
            <HallName key={hall.id} hall={hall} handleDeleteHall={handleDeleteHall} />
          ))}
        </ul>
        <button className="conf-step__button conf-step__button-accent" onClick={() => addHallCallback()}>Создать зал</button>
      </div>}
    </section>
  )
}

export default HallManager

// loader function
// export const hallsLoader = async () => {
//   const responce = await fetch('http://localhost:4000/halls');

//   if (!responce.ok) {
//     throw Error('could not fecth data');
//   }

//   return responce.json();
// }
