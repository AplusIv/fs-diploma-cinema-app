import axios from "axios";
import apiClient from "./api";
// import apiClient from "./jsonServerApi";


// Функционал: Добавление нового зала
const addHallToDB = (data) => {
  // e.preventDefault();

  console.log('Hall adding request');
  apiClient.post('api/halls', data).then(response => console.log(response))
    .catch(error => console.log(error));
}

// Функционал: Удаление выбранного зала
const deleteHallFromDB = (id) => {
  // e.preventDefault();

  console.log('Hall delete request');
  apiClient.delete('api/halls/' + id).then(response => console.log(response))
    .catch(error => console.log(error));
}
// Функционал: Обновление зала
const updateHallInDB = async (id, data) => {
  console.log('Hall updating request');

  try {
    const response = await apiClient.put(`api/halls/${id}`, data);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// Функционал: поиск конкретного зала
const getHallfromDB = async (title) => {
  console.log('Hall get request');
  try {
    const response = await apiClient.get('api/halls/');
    console.log(response);
    return response.data.find(hall => hall.title === title);
  } catch (error) {
    console.log(error);
  }
  // apiClient.get('api/halls/').then( response => {

  //   console.log(response);
  //   response.data.find(hall => hall.title === title);
  // }
  // )
  //   .catch(error => console.log(error));
}

// Функционал: получение всех мест
const getPlaces = async () => {
  console.log('Place get request');
  try {
    const response = await apiClient.get('api/places');
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// Функционал: Добавление мест по дефолту согласно конфигурации зала
const addPlacesToDB = async (hall) => {
  const configuration = hall.places * hall.rows;
  console.log({ configuration });

  let placesData = [];
  let r = 1;
  let p = 1;
  for (let i = 0; i < configuration; i++) {
    const data = {
      'hall_id': hall.id,
      // 'session_id' => 1, // Переделать
      'row': r,
      'place': p,
      'type': "standart",
      // 'is_free' => true,
      'is_selected': false
    }

    placesData.push(data);
    // const response = await apiClient.post('api/places', data);

    p++;

    if (p > hall.places) {
      r++;
      p = 1;
    }
  }

  // const promises = placesData.map(data => apiClient.post('api/places', data))

  // const response = await Promise.all(placesData.map(async data => await apiClient.post('api/places', data)));
  // console.log(response); 
  const promises = placesData.map(async data => {
    try {
      return await apiClient.post('api/places', data);
    } catch (error) {
      console.log(error);
    }
  })

  try {
    // const response = await Promise.all(placesData.map(data => apiClient.post('api/places', data)));
    const response = await Promise.all(promises);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

const addPlacesToHall = async (id, hallData) => {
  try {
    const response = await apiClient.post(`api/halls/${id}/places`, hallData);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// const deletePlacesFromHall = async (id) => {
//   const places = await getPlacesByHall(id);
//   console.log(places);

//   // const promises = places.map(place => apiClient.delete(`api/places/${place.id}`))

//   try {
//     const response = await Promise.all(places.map(place => apiClient.delete(`api/places/${place.id}`).then(res => console.log(res.status))));
//     console.log(response);
//   } catch (error) {
//     console.log(error);    
//   }    
// }

const deletePlacesFromHall = async (id) => {
  const places = await getPlacesByHall(id);
  console.log(places);

  // const promises = places.map(place => apiClient.delete(`api/places/${place.id}`))

  try {
    const promises = places.map(async place => {
      try {
        return await apiClient.delete(`api/places/${place.id}`)
      } catch (error) {
        console.log(error);
      }
    });
    const response = await Promise.all(promises);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

const deletePlacesFromHall2 = async (id) => {
  try {
    const response = await apiClient.delete(`api/halls/${id}/places`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}


const getPlacesByHall = async (id) => {
  console.log('places by exact Hall get request');
  try {
    const response = await apiClient.get(`api/halls/${id}/places`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// Функционал обовление типа мест в БД
const updatePlacesTypes = async (places) => {
  // const promises = places.map(async data => {
  //   const updatedData = {
  //     hall_id: data.hall_id,
  //     row: data.row,
  //     place: data.place,
  //     is_selected: data.is_selected,
  //     type: data.type
  //   };
  //   return await apiClient.put(`api/places/${data.id}`, updatedData);
  // });

  // console.log({ promises });
  if (places.length === 0) {
    console.log('мест для обновления нет');
    return;
  }

  const promises = places.map(async data => {
    try {
      const updatedData = {
        hall_id: data.hall_id,
        row: data.row,
        place: data.place,
        is_selected: data.is_selected,
        type: data.type
      };
      return await apiClient.put(`api/places/${data.id}`, updatedData);
    }
    catch (error) {
      console.log(error);
    }
  });

  try {
    const responses = await Promise.all(
      promises
      // places.map(async data => {
      //   const updatedData = {
      //     hall_id: data.hall_id,
      //     row: data.row,
      //     place: data.place,
      //     is_selected: data.is_selected,
      //     type: data.type
      //   };
      //   return await apiClient.put(`api/places/${data.id}`, updatedData);
      // })
    );
    console.log({ responses });
  } catch (error) {
    console.error(error)
  }
  // Promise.all(promises)
  //   .then(responses => console.log(responses))
  //   .catch(error => console.error(error));
}

// Функционал: Добавление новых фильмов/сеансов
// рабочий вариант для JSON server
const addDataToDB = async (dataArray, url) => {
  // e.preventDefault();

  console.log('array post request');

  const promises = dataArray.map(async data => {
    try {
      return await apiClient.post(url, data);
    } catch (error) {
      console.log(error);      
    }
    // apiClient.post(url, data)
    //   .then(response => console.log(response.statusText));
  })

  try {
    const responses = await axios.all(promises);
    console.log(responses);    
  } catch (error) {
    console.log(error);
    
  }
  // axios.all(promises)
  //   .then(responses => console.log(responses.statusText))
  //   .catch(error => console.error(error))
}

// Функционал: Изменение существующего фильма
const changeDataInDB = async (dataArray, url) => {
  // e.preventDefault();

  console.log('array put request');

  const promises = dataArray.map(async data => {
    try {
      return await apiClient.put(`${url}/${data.id}`, data)
    } catch (error) {
      console.log(error);      
    }
    // apiClient.post(url, data)
    //   .then(response => console.log(response.statusText));
  })

  try {
    const responses = await axios.all(promises);
    console.log(responses);    
  } catch (error) {
    console.log(error);    
  }
}

// Функционал: Удаление выбранного элемента
const deleteDataInDB = async (dataArray, url) => {
  console.log('array delete request');

  // dataArray содержит только id удаляемых элементов
  dataArray.map(async id => {
    try {
      return await apiClient.delete(`${url}/${id}`)
    } catch (error) {
      console.log(error);      
    }
    // apiClient.post(url, data)
    //   .then(response => console.log(response.statusText));
  })

  // try {
  //   const responses = await axios.all(promises);
  //   console.log(responses);    
  // } catch (error) {
  //   console.log(error);    
  // }
}

// КЛИЕНТСКАЯ ЧАСТЬ
// Функционал: получение сеансов на конкретную дату
const getSessionsByDate = async (date) => {
  console.log('Sessions by date get request');
  try {
    const response = await apiClient.get('api/sessions/date/' + date);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

const makeOrderWithTickets = async (dataArray, url) => {
  // e.preventDefault();

  console.log('array post request');
  console.log({ticketsToAddInOrder: dataArray});
  

  try {
    // const response = await apiClient.post(url, dataArray, {headers: {'Content-Type': 'application/json'}});
    const response = await apiClient.post(url, dataArray);
    // response.json().then(data => console.log(data));
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

const updateOrderAndTicketStatus = async (data, url) => {
  // e.preventDefault();

  console.log('array put request');

  try {
    const response = await apiClient.put(`${url}/${data.id}`, data)
    // response.json().then(data => console.log(data));
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// Функционал: получение сеансов на конкретную дату
const getDataById = async (url, id) => {
  console.log('Get collection by other primary key ID get request');
  try {
    const response = await apiClient.get(`${url}/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// Функционал: обновление всех мест в выбранном зале
const updateHallPlaces = async (data, id) => {
  // e.preventDefault();

  console.log('array put request');

  try {
    const response = await apiClient.put(`api/halls/${id}/places`, data)
    // response.json().then(data => console.log(data));
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// // Функционал: Добавление новых фильмов/сеансов
// // рабочий вариант для JSON server
// const addDataToDB = (array, url) => {
//   // e.preventDefault();

//   console.log('array post request');

//   const promises = array.map(data => {
//     apiClient.post(url, data)
//       .then(response => console.log(response.statusText));
//   })

//   axios.all(promises)
//     .then(responses => console.log(responses.statusText))
//     .catch(error => console.error(error))
// }


// const addMovieToDB = (data) => {
//   // e.preventDefault();

//   console.log('movie adding request');

//   apiClient.post('/movies', data).then(response => {
//     console.log(response.statusText);
//   }).catch(error => {
//     console.log(error);
//   })
// }

// // Функционал: Изменение существующего фильма
// const changeDataInDB = (array, url) => {
//   // e.preventDefault();

//   console.log('array put request');

//   const promises = array.map(data => {
//     apiClient.put(`${url}/${data.id}`, data)
//       .then(response => console.log(response.statusText));
//   })

//   axios.all(promises)
//     .then(responses => console.log(responses.statusText))
//     .catch(error => console.error(error))

//   // const promises = array.map(data => {
//   //   apiClient.put(`${url}/${data.id}`, data)
//   // })

//   // axios.all(promises).then(responses => {
//   //   responses.forEach(response => console.log(response.statusText))
//   // }).catch(error => {
//   //   console.error(error)
//   // })
// }

// // Функционал: Удаление выбранного зала
// const deleteDataInDB = (array, url) => {
//   console.log('array delete request');

//   const promises = array.map(id => {
//     apiClient.delete(`${url}/${id}`)
//       .then(response => console.log(response.statusText));
//   })

//   axios.all(promises)
//     .then(responses => console.log(responses.statusText))
//     .catch(error => console.error(error))

//   // apiClient.delete('/halls/' + id).then(response => console.log(response.statusText))
//   //   .catch(error => console.log(error));
// }


export {
  addHallToDB,
  getHallfromDB,
  addPlacesToDB,
  addPlacesToHall,
  deletePlacesFromHall,
  deletePlacesFromHall2,
  getPlacesByHall,
  getPlaces,
  deleteHallFromDB,
  updateHallInDB,
  updatePlacesTypes,
  addDataToDB,
  changeDataInDB,
  deleteDataInDB,
  getSessionsByDate,
  makeOrderWithTickets,
  updateOrderAndTicketStatus,
  getDataById,
  updateHallPlaces,
}