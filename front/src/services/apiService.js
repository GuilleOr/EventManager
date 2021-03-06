import decode from 'jwt-decode';

const setToken = idToken => localStorage.setItem('id_token', idToken);

const getToken = () => localStorage.getItem('id_token');

const clearToken = () => localStorage.removeItem('id_token');

const getMyLists = ({ page, query }) =>
  requestUrl(`/events_lists?page=${page}&name=${query}`, {
    method: 'GET'
  }).then(res => res.json());

const createEventList = name =>
  requestUrl(`/events_lists`, {
    method: 'POST',
    body: JSON.stringify({
      name
    })
  });

const addEventList = (id, eventId) =>
  requestUrl(`/events_lists/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      id: eventId
    })
  });

const updateEventList = (id, name) =>
  requestUrl(`/events_lists/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      name
    })
  });

const deleteEventList = id =>
  requestUrl(`/events_lists/${id}`, {
    method: 'DELETE'
  });

const getUsers = ({ page, query }) => {
  const baseUrl = `/users?page=${page}`;
  return requestUrl(query ? `${baseUrl}&name=${query}` : baseUrl, {
    method: 'GET'
  }).then(res => res.json());
};

const getUserDetail = userId =>
  requestUrl(`/users/${userId}`, {
    method: 'GET'
  }).then(res => res.json());

const getEvents = ({ page, query }) =>
  requestUrl(`/events?page=${page}&query=${query}`, {
    method: 'GET'
  }).then(res => res.json());

const getAlarms = ({ page, query }) =>
  requestUrl(`/alarms?page=${page}&name=${query}`, {
    method: 'GET'
  }).then(res => res.json());

const deleteAlarm = alarmId =>
  requestUrl(`/alarms/${alarmId}`, {
    method: 'DELETE'
  });

const createAlarm = (name, criteria) =>
  requestUrl('/alarms', {
    method: 'POST',
    body: JSON.stringify({
      name,
      criteria
    })
  });

const getEventStats = eventId =>
  requestUrl(`/events/${eventId}/users`, {
    method: 'GET'
  }).then(res => res.json());

const getEventsFrom = date =>
  requestUrl(`/events_lists/events?from=${date}`, {
    method: 'GET'
  }).then(res => res.json());

const deleteFromEventList = (id, eventId) =>
  requestUrl(`/events_lists/${id}/events/${eventId}`, {
    method: 'DELETE'
  });

const getEventsForList = id => () =>
  requestUrl(`/events_lists/${id}/events`, {
    method: 'GET'
  }).then(res => res.json());

const getLists = ({ page, query }) =>
  requestUrl(`/events_lists/all?page=${page}&name=${query}`, {
    method: 'GET'
  }).then(res => res.json());

const getEventListMatch = (eventId1, eventId2) =>
  requestUrl(`/events_lists/match?eventListId1=${eventId1}&eventListId2=${eventId2}`, {
    method: 'GET'
  }).then(res => res.json());

const getEventsForAlarm = alarmId => () =>
  requestUrl(`/alarms/${alarmId}/events`, {
    method: 'GET'
  }).then(res => res.json());

const logout = () =>
  requestUrl(`/users/logout`, {
    method: 'DELETE'
  })
    .then(() => clearToken())
    .catch(() => clearToken());

const register = (username, password) =>
  requestUrl(`/users`, {
    method: 'POST',
    body: JSON.stringify({
      username,
      password
    })
  });

const login = (username, password) =>
  requestUrl(`/users/login`, {
    method: 'POST',
    headers: {},
    body: JSON.stringify({
      username,
      password
    })
  }).then(res => {
    setToken(res.headers.get('authorization'));
    return res;
  });

const isTokenExpired = token => {
  try {
    const decoded = decode(token);
    return decoded.exp < Date.now() / 1000;
  } catch (err) {
    return false;
  }
};

const loggedIn = () => {
  // Checks if there is a saved token and it's still valid
  const token = getToken();
  return !!token && !isTokenExpired(token); // handwaiving here
};

const getProfile = () => decode(getToken());

const isAdmin = () => getProfile().admin;

const _checkStatus = response => {
  // raises an error in case response status is not a success
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
};

const requestUrl = (path, options) => {
  // performs api calls sending the required authentication headers
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };

  if (loggedIn()) {
    headers['Authorization'] = getToken();
  }
  return fetch(`${process.env.REACT_APP_API}${path}`, {
    headers,
    ...options
  }).then(_checkStatus);
};

export default {
  login,
  register,
  logout,
  getProfile,
  isAdmin,
  loggedIn,
  createEventList,
  getEvents,
  getEventsFrom,
  getEventsForList,
  deleteFromEventList,
  getEventStats,
  getMyLists,
  deleteEventList,
  updateEventList,
  addEventList,
  getUsers,
  getUserDetail,
  getAlarms,
  createAlarm,
  deleteAlarm,
  getLists,
  getEventListMatch,
  getEventsForAlarm
};
