import { useRef } from 'react';
import { useNotifocationContext } from '../../store/notification-context';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  const emailRef = useRef();
  const notificationCtx = useNotifocationContext();
  const { showNotification } = notificationCtx;

  const registrationHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    if (!enteredEmail.trim().includes('@')) {
      alert('Please enter valid email');
      return;
    }
    showNotification({
      status: 'pending',
      title: 'Loading',
      message: 'Subsribing...',
    });
    fetch('/api/email', {
      method: 'POST',
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.message || 'Something went wrong...');
        }
      })
      .then(() => {
        showNotification({
          status: 'success',
          title: 'Success',
          message: 'You are successfully subscibed',
        });
      })
      .catch((err) => {
        showNotification({
          status: 'error',
          title: 'Error',
          message: err.message || 'Something went wrong...',
        });
      });
    emailRef.current.value = '';
  };

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={emailRef}
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
