import classes from './notification.module.css';
import { useNotifocationContext } from '../../store/notification-context';

function Notification(props) {
  const { title, message, status } = props;
  const notificationCtx = useNotifocationContext();
  const { hideNotification } = notificationCtx;

  let statusClasses = '';

  if (status === 'success') {
    statusClasses = classes.success;
  }

  if (status === 'error') {
    statusClasses = classes.error;
  }

  if (status === 'pending') {
    statusClasses = classes.pending;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
