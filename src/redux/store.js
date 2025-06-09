import { configureStore } from '@reduxjs/toolkit'

// redux slices
// (1) main data reducers
import hallsReducer from './slices/hallSlice'
import placesReducer from './slices/placeSlice'
import moviesReducer from './slices/movieSlice'
import sessionsReducer from './slices/sessionSlice'

// (2) admin side reducers
// (2.1) popups
import popupInfoReducer from './slices/popupSlice'
import hallPopupInfoReducer from './slices/hallPopupSlice'
import hallPopupDataReducer from './slices/hallPopupDataHandlerSlice'
import popupEditMovieReducer from './slices/popupEditMovieHandlerSlice'
import popupAddMovieReducer from './slices/popupAddMovieHandlerSlice'
import popupEditSessionsReducer from './slices/popupEditSessionsHandlerSlice' // управление списком сеансов
import popupAddSessionReducer from './slices/popupAddSessionHandlerSlice'
// (2.2) admin side sections
import hallPricesReducer from './slices/hallPricesSlice'
import hallPLacesReducer from './slices/hallPlacesSlice'
import sessionManagerReducer from './slices/sessionManagerSlice'

// (3) client side reducers (no protected by admin)
import guestHallsReducer from './slices/guestHallSlice'
import guestMoviesReducer from './slices/guestMovieSlice'
import guestPlacesReducer from './slices/guestPlaceSlice'
import guestSessionsReducer from './slices/guestSessionSlice'
import ticketsReducer from './slices/ticketSlice'
import orderReducer from './slices/orderSlice'
import pageNavigatorReducer from './slices/pageNavigatorSlice'
import sessionsByDateReducer from './slices/sessionsByDateSlice'
import buyingReducer from './slices/buyingSlice'

// (4) login reducer
import loginReducer from './slices/loginSlice'

// saga
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/rootSaga'

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware]; // массив с разными возможными мидвейр

export const store = configureStore({
  reducer: {
    // main data reducers
    hallsReducer,
    placesReducer,
    moviesReducer,
    sessionsReducer,

    // popup reducers
    popupInfoReducer,
    hallPopupInfoReducer,
    hallPopupDataReducer,
    popupEditMovieReducer,
    popupAddMovieReducer,
    popupEditSessionsReducer,
    popupAddSessionReducer,

    // price configurator reducer
    hallPricesReducer,
    // hall and place configurator reducer
    hallPLacesReducer,
    // sessions and movies manager
    sessionManagerReducer,

    // client side
    guestHallsReducer,
    guestMoviesReducer,
    guestPlacesReducer,
    guestSessionsReducer,    
    ticketsReducer,
    orderReducer,
    pageNavigatorReducer,
    sessionsByDateReducer,
    buyingReducer,

    // login
    loginReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

// run the saga
sagaMiddleware.run(rootSaga);