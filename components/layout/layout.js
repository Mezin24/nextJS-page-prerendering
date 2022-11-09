import { Fragment } from 'react';
import { useNotifocationContext } from '../../store/notification-context';
import Notification from '../ui/notification';

import MainHeader from './main-header';

function Layout(props) {
  const notificationCtx = useNotifocationContext();
  const { notification } = notificationCtx;

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {notification && <Notification {...notification} />}
    </Fragment>
  );
}

export default Layout;
