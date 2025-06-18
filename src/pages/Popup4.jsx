/* eslint-disable react/prop-types */
import PopupBase from "./PopupBase";
import PopupChangeForm from "./PopupChangeForm";
import PopupHallAdding from "./PopupHallAdding";
import PopupMovieAdding from "./PopupMovieAdding";
import PopupChangeSessions2 from "./PopupChangeSessions2";

const Popup4 = ({
  popupInfo,
  halls = [],
  movies = [],
  sessions = [], 
  onChangeCallback,
  onAddCallback,
  onDeleteCallback, 
  handlePopup
}) => {

  // Ids
  let lastSessionId = sessions.at(-1)?.id; // (?) operator https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Optional_chaining
  // let lastHallId = halls.at(-1)?.id;
  // let lastMovieId = movies && movies.at(-1)?.id;

  if (popupInfo.status === 'adding movie popup') {
    return (
      <PopupBase popupInfo={popupInfo} handlePopup={handlePopup}>
        <PopupMovieAdding
          buttonTitle={'Добавить фильм'}
          onAddCallback={onAddCallback}
          handlePopup={handlePopup}
        />
      </PopupBase>
    )
  }

  if (popupInfo.status === 'adding hall popup') {
    return (
      <PopupBase popupInfo={popupInfo} handlePopup={handlePopup}>
        <PopupHallAdding
          buttonTitle={'Добавить зал'}
          onAddCallback={onAddCallback}
          handlePopup={handlePopup} />
      </PopupBase>
    )
  }

  if (popupInfo.status === 'editing movie popup') {
    return (
      <>
        <PopupBase popupInfo={popupInfo} handlePopup={handlePopup}>
          <PopupChangeForm
            onChangeCallback={onChangeCallback}
            onDeleteCallback={onDeleteCallback}
            buttonTitle={'Изменить фильм'}
            handlePopup={handlePopup} />
        </PopupBase>
      </>
    )
  }

  if (popupInfo.status === 'editing sessions') {
    return (
      <>
        <PopupBase popupInfo={popupInfo} handlePopup={handlePopup}>
          <PopupChangeSessions2
            movies={movies}
            sessions={sessions}
            halls={halls}
            lastSessionId={lastSessionId}
            onChangeCallback={onChangeCallback}
            onAddCallback={onAddCallback}
            onDeleteCallback={onDeleteCallback}
          />
        </PopupBase>
      </>
    )
  }

  if (popupInfo.status === 'hide popup') {
    return (
      <PopupBase popupInfo={popupInfo} handlePopup={handlePopup}></PopupBase>
    )
  }
}

export default Popup4