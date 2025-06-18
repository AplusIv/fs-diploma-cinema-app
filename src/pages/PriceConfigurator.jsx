import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeData, handleBlurData, putHallData, setHalls, setPrices, setRefreshDataStatus, setSelectedHallId } from "../redux/slices/hallPricesSlice";
import HallConfiguratorTitles from "./HallConfiguratorTitles"
import SectionButtons from "./SectionButtons"
import SectionHeader from "./SectionHeader"

const PriceConfigurator = () => {
  // // Показ/скрытие секции
  const [isActiveHeaderState, setIsActiveHeaderState] = useState(true);
  const toggleSectionVisibility = () => {
    setIsActiveHeaderState(!isActiveHeaderState);
  }

  // redux prices 
  const pricesRedux = useSelector(state => state.hallPricesReducer.prices);
  const hallsRedux = useSelector(state => state.hallsReducer.halls);
  const selectedHallId = useSelector(state => state.hallPricesReducer.selectedHallId);

  // статус обновления начальными данными
  const refreshDataStatusRedux = useSelector(state => state.hallPricesReducer.refreshDataStatus);

  // статусы загрузки
  const hallsReduxLoading = useSelector(state => state.hallsReducer.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log('price effect is on');
    dispatch(setPrices(hallsRedux)); // заполнение конфигурации цен данными залов, загруженных из hallSlice при помощи эффекта
    dispatch(setHalls(hallsRedux));

    if (refreshDataStatusRedux !== 'initial data is loaded') {
      dispatch(setRefreshDataStatus('data refreshed'));
    }
  }, [hallsRedux, refreshDataStatusRedux]);


  const handleChange = (e) => {
    const { value } = e.target;
    dispatch(setSelectedHallId(value));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('handleSubmit');

    // 1) Есть ли изменения в ценах залов
    let hallPriceDiffs = []; // Залы с изменившимися ценами

    hallsRedux.filter(hallData => {
      const configuration = pricesRedux.find(configuration => configuration.hall_id === hallData.id);

      if (!(hallData.normal_price === configuration.normal_price && hallData.vip_price === configuration.vip_price)) {
        hallPriceDiffs.push({ ...hallData, normal_price: configuration.normal_price, vip_price: configuration.vip_price });
        return true;
      }
    })

    if (hallPriceDiffs.length > 0) {
      const updatedHalls = hallPriceDiffs.map(hallPriceDiff => {
        return {
          id: hallPriceDiff.id,
          title: hallPriceDiff.title,
          rows: hallPriceDiff.rows,
          places: hallPriceDiff.places,
          normal_price: Number(hallPriceDiff.normal_price).toFixed(2),
          vip_price: Number(hallPriceDiff.vip_price).toFixed(2)
        }
      });
      dispatch(putHallData({ dataArray: updatedHalls, url: 'api/halls' }));
    }
  }

  const handleRefresh = () => {
    console.log('handleRefresh');
    dispatch(setRefreshDataStatus('refresh data')); // перезапуск стартового useEffect c начальными данными с сервера
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    dispatch(changeData({ property: name, value })); // ввод любого символа (в т.ч. букв, знаков препинания и т.д.)
  }

  const handleBlur = (e) => {
    const { name, value } = e.target;
    dispatch(handleBlurData({ property: name, value }));
  }

  if (hallsReduxLoading !== 'idle') {
    return (
      <section className="conf-step" >
        <SectionHeader name={'Конфигурация цен'} isActiveHeaderState={isActiveHeaderState} handleClick={toggleSectionVisibility} />
        <div className="conf-step__wrapper">
          <span className="loader" ></span>
        </div>
      </section>
    )
  }

  return (
    <section className="conf-step">

      <SectionHeader name={'Конфигурация цен'} isActiveHeaderState={isActiveHeaderState} handleClick={toggleSectionVisibility} />

      <div className="conf-step__wrapper">
        <form onSubmit={handleSubmit}>

          <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
          <HallConfiguratorTitles name="prices-hall" handleChange={handleChange} />

          <p className="conf-step__paragraph">Установите цены для типов кресел:</p>
          <div className="conf-step__legend">
            <label className="conf-step__label">Цена, рублей
              <input type="text"
                className="conf-step__input"
                name="normal_price"
                placeholder="0"
                value={pricesRedux.length > 0 ?
                  pricesRedux.find(configuration => configuration.hall_id === selectedHallId).normal_price :
                  ''}
                onChange={handleInput}
                onBlur={handleBlur}
              />
            </label>
            за <span className="conf-step__chair conf-step__chair_standart"></span> обычные кресла
          </div>
          <div className="conf-step__legend">
            <label className="conf-step__label">Цена, рублей
              <input
                type="text"
                className="conf-step__input"
                name="vip_price"
                placeholder="0"
                value={pricesRedux.length > 0 ?
                  pricesRedux.find(configuration => configuration.hall_id === selectedHallId).vip_price :
                  ''}
                onChange={handleInput}
                onBlur={handleBlur}
              />
            </label>
            за <span className="conf-step__chair conf-step__chair_vip"></span> VIP кресла
          </div>

          <SectionButtons handleRefresh={handleRefresh} />
        </form>
      </div>
    </section>
  )
}

export default PriceConfigurator