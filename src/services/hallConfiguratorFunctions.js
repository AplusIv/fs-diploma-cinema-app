    // сгрупированные места в зависимости от зала
  export const prepareHallPlaces = (places, configuration, hall, sorterFn) => {
    let placesGroupedByRow = [];
    const placesByHall = places.filter(place => place.hall_id === hall.id);

    for (let index = 1; index <= configuration.rows; index++) {
      const rowPlaces = placesByHall.filter(place => place.row === index);
      placesGroupedByRow.push(rowPlaces.sort(sorterFn));
    }

    // console.log({ placesGroupedByRow });
    return placesGroupedByRow;
  }

  // создание новых мест по заданной конфигурации (для изменения конфигурации зала)
  export const handleNewPlaces = (configuration, placeId, sorterFn) => {
    const newPlaces = [];
    const placesAmount = configuration.rows * configuration.places;

    let p = 1; // первое место
    let r = 1; // первый ряд

    for (let index = 0; index < placesAmount; index++) {

      const hallPlace = {
        id: ++placeId,
        hall_id: configuration.hall_id,
        row: r,
        place: p,
        type: "standart",
        is_selected: false
      };

      newPlaces.push(hallPlace);

      p++;

      if (p > configuration.places) {
        r++;
        p = 1;
      }
    }

    newPlaces.sort(sorterFn);
    return newPlaces;
  }
