import { useState, useContext, createContext, useEffect } from 'react';

const NotificationContext = createContext({
  notification: null,
  showNotification: (newNotification) => {},
  hideNotification: () => {},
});

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (
      notification &&
      (notification.status === 'success' || notification.status === 'error')
    ) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (newNotification) => {
    setNotification(newNotification);
  };

  const hideNotification = () => {
    setNotification(null);
  };

  return (
    <NotificationContext.Provider
      value={{
        notification,
        showNotification,
        hideNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifocationContext = () => {
  return useContext(NotificationContext);
};
