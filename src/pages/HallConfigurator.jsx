import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeData, handleNewHallsAndPlaces, putPlaceData, setConfiguration, setHalls, setPlaces, setPlaceType, setRefreshDataStatus, setSelectedHallId } from "../redux/slices/hallPlacesSlice"

import HallConfiguratorPlaces from "./HallConfiguratorPlaces"
import HallConfiguratorTitles from "./HallConfiguratorTitles"
import SectionButtons from "./SectionButtons"
import SectionHeader from "./SectionHeader"

// дополнительная логика
import { prepareHallPlaces } from "../services/hallConfiguratorFunctions"
import { compareFnByPlaceAssending } from "../services/sorterFunctions"

const HallConfigurator = () => {

  // Показ/скрытие секции
  const [isActiveHeaderState, setIsActiveHeaderState] = useState(true);

  const toggleSectionVisibility = () => {
    setIsActiveHeaderState(!isActiveHeaderState);
  }

  // Redux
  const dispatch = useDispatch();
  const hallsRedux = useSelector(state => state.hallsReducer.halls);
  const placesRedux = useSelector(state => state.placesReducer.places);
  const placesConfigurationRedux = useSelector(state => state.hallPLacesReducer.configuration);
  const hallConfiguratorPlacesRedux = useSelector(state => state.hallPLacesReducer.places);
  const selectedHallId = useSelector(state => state.hallPLacesReducer.selectedHallId);

  // статусы загрузки
  const hallsReduxLoading = useSelector(state => state.hallsReducer.loading);
  const placesReduxLoading = useSelector(state => state.placesReducer.loading);

  const refreshDataStatusRedux = useSelector(state => state.hallPLacesReducer.refreshDataStatus);

  useEffect(() => {
    // console.log('hallConfigurator effect 2 is on');

    dispatch(setPlaces(placesRedux)); // заполнение массива зрительских мест, загруженных из placeSlice при помощи эффекта
    dispatch(setHalls(hallsRedux));
    dispatch(setConfiguration(hallsRedux)); // заполнение конфигурации количества рядов/мест данными залов, загруженных из hallSlice при помощи эффекта

    if (refreshDataStatusRedux !== 'initial data is loaded') {
      dispatch(setRefreshDataStatus('data refreshed'));
    }
  }, [hallsRedux, placesRedux, refreshDataStatusRedux])


  // показ выбранного зала
  const handleChange = (e) => {
    dispatch(setSelectedHallId(e.target.value));
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    dispatch(changeData({ property: name, value }));
  }

  const handleRefresh = () => {
    dispatch(setRefreshDataStatus('refresh data')); // перезапуск стартового useEffect
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit');

    // 1) Есть ли изменения в конфигурации залов
    let configurationHallDiffs = []; // Залы с новой конфигурацией
    let sameConfigurationHalls = []; // Залы с неизменившейся конфигурацией
    hallsRedux.filter(hallData => {
      const configuration = placesConfigurationRedux.find(configuration => configuration.hall_id === hallData.id);

      if (!(hallData.rows === configuration.rows && hallData.places === configuration.places)) {
        configurationHallDiffs.push({ ...hallData, rows: configuration.rows, places: configuration.places });
        return true;
      } else {
        sameConfigurationHalls.push({ ...hallData });
        return false;
      }
    })

    console.log({ configurationHallDiffs });
    console.log({ sameConfigurationHalls });

    // Все залы, где изменились типы мест
    const getDiffs = (arr1, arr2) => {
      return arr1.filter(arr1El => {
        const arr2El = arr2.find(el => el.row === arr1El.row && el.place === arr1El.place && el.hall_id === arr1El.hall_id);
        if (arr2El) return (arr1El.type !== arr2El.type) ? true : false;
      })
    };

    const arrDiffsWithNewTypes = getDiffs(hallConfiguratorPlacesRedux, placesRedux);
    const diffsMap = arrDiffsWithNewTypes.map(diff => diff.hall_id);
    // console.log({diffsMap});
    
    // Залы, где изменилась конфигурация мест
    const configurationDiffsMap = configurationHallDiffs.map(diff => diff.id);
    // console.log({configurationDiffsMap});

    // Все ID залов, где произошли каки-либо изменения, для запросов
    const uniqueDiffs = [...new Set([...diffsMap, ...configurationDiffsMap])]; // добавить единожды номера залов
    console.log({ uniqueDiffs });

    // 2) В массивы собираются данные для обновления на сервере
    let updatePlaceTypeArray = []; // места с прежней конфигурацией мест, где нужно обновить типы мест

    let updateHallConfigurationArray = []; // измененная конфигурация зала/залов
    let updateNewPlaceTypeArray = []; // места с новой конфигурацией мест

    uniqueDiffs.forEach(hall_id => {
      const differentHallConfiguration = configurationHallDiffs.find(configuration => configuration.id === hall_id);
      if (differentHallConfiguration) {
        console.log('зал с изменённой конфигурацией -> обновить зал и места');
        const updatedHall = {
          id: differentHallConfiguration.id,
          title: differentHallConfiguration.title,
          rows: differentHallConfiguration.rows,
          places: differentHallConfiguration.places,
          normal_price: Number(differentHallConfiguration.normal_price).toFixed(2),
          vip_price: Number(differentHallConfiguration.vip_price).toFixed(2),
        };

        updateHallConfigurationArray.push(updatedHall);
        updateNewPlaceTypeArray.push({
          hall_id,
          places: hallConfiguratorPlacesRedux.filter(place => place.hall_id === hall_id),
        });
      } else {
        console.log('зал с прежней конфигурацией -> обновить места');
        updatePlaceTypeArray.push({
          hall_id,
          places: hallConfiguratorPlacesRedux.filter(place => place.hall_id === hall_id),
        });
      }
    });

    // 3) Вызов экшенов для изменения залов, количества мест и типов мест
    if (updateHallConfigurationArray.length > 0) {
      // изменить конфигурацию залов, удалить прежние места и создать новые, обновить типы мест
      dispatch(handleNewHallsAndPlaces({
        hallDataArray: updateHallConfigurationArray,
        placeDataArray: [...updateNewPlaceTypeArray, ...updatePlaceTypeArray], // обновить все изменённые типы мест одним запросом
      }));
    } else if (updatePlaceTypeArray.length > 0) {
      // изменить только типы мест
      dispatch(putPlaceData(updatePlaceTypeArray));
    }
  }

  const handlePlaceType = (placeId) => {
    dispatch(setPlaceType(placeId));
  }

  if (hallsReduxLoading !== 'idle' || placesReduxLoading !== 'idle') {
    return (
      <section className="conf-step" >
        <SectionHeader name={'Конфигурация залов'} isActiveHeaderState={isActiveHeaderState} handleClick={toggleSectionVisibility} />
        <div className="conf-step__wrapper">
          <span className="loader" ></span>
        </div>
      </section>
    )
  }

  return (
    <section className="conf-step">
      <SectionHeader name={'Конфигурация залов'} isActiveHeaderState={isActiveHeaderState} handleClick={toggleSectionVisibility} />

      {<div className="conf-step__wrapper">
        <form onSubmit={handleSubmit}>
          <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
          <HallConfiguratorTitles name="chairs-hall" handleChange={handleChange} />

          <p className="conf-step__paragraph">Укажите количество рядов и максимальное количество кресел в ряду:</p>
          <div className="conf-step__legend">
            <label className="conf-step__label">Рядов, шт
              <input
                type="text"
                name="rows"
                className="conf-step__input"
                value={placesConfigurationRedux.length > 0 ?
                  placesConfigurationRedux.find(configuration => configuration.hall_id === selectedHallId).rows : ''}
                onChange={handleInput}
                placeholder="10" />
            </label>
            <span className="multiplier">x</span>
            <label className="conf-step__label">Мест, шт
              <input
                type="text"
                name="places"
                className="conf-step__input"
                value={placesConfigurationRedux.length > 0 ?
                  placesConfigurationRedux.find(configuration => configuration.hall_id === selectedHallId).places : ''}
                onChange={handleInput}
                placeholder="8" />
            </label>
          </div>
          <p className="conf-step__paragraph">Теперь вы можете указать типы кресел на схеме зала:</p>
          <div className="conf-step__legend">
            <span className="conf-step__chair conf-step__chair_standart"></span> — обычные кресла
            <span className="conf-step__chair conf-step__chair_vip"></span> — VIP кресла
            <span className="conf-step__chair conf-step__chair_disabled"></span> — заблокированные (нет кресла)
            <p className="conf-step__hint">Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши</p>
          </div>

          <div className="conf-step__hall">
            {placesConfigurationRedux.length > 0 ?
              <HallConfiguratorPlaces
                places={prepareHallPlaces(
                  hallConfiguratorPlacesRedux,
                  placesConfigurationRedux.find(configuration => configuration.hall_id === selectedHallId),
                  hallsRedux.find(hall => hall.id === selectedHallId),
                  compareFnByPlaceAssending)}
                handlePlaceType={handlePlaceType}
              /> :
              null}
          </div>

          <SectionButtons handleRefresh={handleRefresh} />
        </form>
      </div>}
    </section>
  )
}

export default HallConfigurator