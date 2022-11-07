import { useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;
  console.log(eventId);

  const [showComments, setShowComments] = useState(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    const newComment = {
      id: new Date().toISOString(),
      ...commentData,
    };
    console.log(newComment);
    fetch(`/api/comments/${props.eventId}`, {
      method: 'POST',
      body: JSON.stringify(newComment),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList eventId={eventId} />}
    </section>
  );
}

export default Comments;
