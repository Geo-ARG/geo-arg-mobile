
import { SEND_LOCATION, SCAN, QUEST_LIST } from '../constants'

export const updateLocation = (locationId) => ({type: SEND_LOCATION, locationId })
export const updateNearby = (nearby) => ({type: SCAN, nearby })
export const setQuestList = (quests) => ({type: QUEST_LIST, quests})
export const setEvents = (events) => {
  return {
    type: 'SET_EVENTS',
    payload: events
  }
}

export const joinGame = (eventData) => {
  return {
    type: 'SET_EVENT',
    payload: eventData
  }
}

export const checkAnswer = (userEventId, userAnswer) => {
  // return (dispatch) => {
  //   fetch(`http://geo-arg-server-dev.ap-southeast-1.elasticbeanstalk.com/api/userevents/quests/useranswer`)
  // }
}

export const scanNearby = (latitude, longitude) => {
  let body =  {
    latitude: latitude,
    longitude: longitude
  }
  return (dispatch) => {
    fetch(`http://geo-arg-server-dev.ap-southeast-1.elasticbeanstalk.com/api/locations/scan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
      })
    .then(response => response.json())
    .then(nearby => {
      return dispatch(updateNearby(nearby))
    })
    .catch(error => {console.log('Request failed', error)});
  }
}

export const sendLocation = (coords, userId) => {
  let body =  {
    latitude: coords.latitude,
    longitude: coords.longitude,
    UserId: userId
  }
  return (dispatch) => {
    fetch(`http://geo-arg-server-dev.ap-southeast-1.elasticbeanstalk.com/api/locations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
      })
    .then(response => response.json())
    .then(location => {
      return dispatch(updateLocation(location.Locations.id))
    })
    .catch(error => {console.log('Request failed', error)});
  }
}

export const watchLocation = (coords, locationId) => {
  let body = {
    latitude: coords.latitude,
    longitude: coords.longitude
  }
  return (dispatch) => {
    fetch(`http://geo-arg-server-dev.ap-southeast-1.elasticbeanstalk.com/api/locations/${locationId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {console.log(data);})
    .catch(err => {})
  }
}

export const fetchQuestList = (UserId, EventId) => {
  return (dispatch) => {
    fetch(`http://geo-arg-server-dev.ap-southeast-1.elasticbeanstalk.com/api/userevents/user/${UserId}/event/${EventId}`)
      .then(response => response.json())
      .then(quests => {
        return dispatch(setQuestList(quests))
      })
      .catch(error => {console.log('Request failed', error)});
  }
}

export const fetchEvents = () => {
  return (dispatch) => {
    fetch(`http://geo-arg-server-dev.ap-southeast-1.elasticbeanstalk.com/api/events`)
      .then(response => {
        return response.json()
      })
      .then(resp => {
        return dispatch(setEvents(resp))
      })
      .catch(err => {})
  }
}
