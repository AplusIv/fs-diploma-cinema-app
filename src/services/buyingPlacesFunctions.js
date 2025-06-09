// Клиентская сторона
// Отрисовка мест в зависимости от конкретного зала
export const prepareHallPlaces = (places, hall, sorterFn) => {
  let placesGroupedByRow = [];
  const placesByHall = places.filter(place => place.hall_id === hall.id);

  for (let index = 1; index <= hall.rows; index++) {
    const rowPlaces = placesByHall.filter(place => place.row === index);
    placesGroupedByRow.push(rowPlaces.sort(sorterFn));
  }

  // console.log({ placesGroupedByRow });
  return placesGroupedByRow;
}
