import { useRef } from 'react';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  const emailRef = useRef();

  const registrationHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    if (!enteredEmail.trim().includes('@')) {
      alert('Please enter valid email');
      return;
    }
    fetch('/api/email', {
      method: 'POST',
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    emailRef.current.value = '';
    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
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
