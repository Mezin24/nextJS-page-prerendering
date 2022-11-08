import { useState, useContext, createContext } from 'react';

const NotificationContext = createContext({
  notification: null,
  showNotification: () => {},
  hideNotification: () => {},
});

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);
  return (
    <NotificationContext.Provider
      value={{
        notification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifocationContext = () => {
  return useContext(NotificationContext);
};
