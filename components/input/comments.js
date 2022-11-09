import { useState, useEffect } from 'react';
import { useNotifocationContext } from '../../store/notification-context';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;
  const notificationCtx = useNotifocationContext();
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(null);
  const { showNotification, hideNotification } = notificationCtx;

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments/${eventId}`);

      const data = await res.json();
      const { comments } = data;
      return comments;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (showComments) {
      fetchComments().then((comments) => {
        setComments(comments);
      });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    const newComment = {
      id: new Date().toISOString(),
      ...commentData,
    };
    showNotification({
      status: 'pending',
      title: 'Loading',
      message: 'Posting new comment...',
    });

    fetch(`/api/comments/${props.eventId}`, {
      method: 'POST',
      body: JSON.stringify(newComment),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.message || 'Something went wrong...');
        }

        showNotification({
          status: 'success',
          title: 'Success',
          message: 'You post successfully published',
        });
        return res.json();
      })
      .then(() => {
        setComments((prev) => [newComment, ...prev]);
      })
      .catch((err) => {
        showNotification({
          status: 'error',
          title: 'Error',
          message: err.message || 'Something went wrong...',
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;
