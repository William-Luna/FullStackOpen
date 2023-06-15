import { createContext, useReducer, useContext } from 'react'

const notiReducer = (state, action) => {
  switch (action.type) {
    case "SEND":
      return action.payload
    case "CLEAR":
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notiReducer, '')

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )

}

export const useNotificationValue = () => {
  const notiAndDispatch = useContext(NotificationContext) // [notification, dispatch]
  return notiAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notiAndDispatch = useContext(NotificationContext) // [notification, dispatch]
  return notiAndDispatch[1]
}

export default NotificationContext