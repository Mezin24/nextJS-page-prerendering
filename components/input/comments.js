import { useState, useEffect } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;
  console.log(eventId);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(null);

  const fetchComments = async () => {
    const res = await fetch(`/api/comments/${eventId}`);
    const data = await res.json();
    const { comments } = data;
    return comments;
  };

  useEffect(() => {
    fetchComments().then((comments) => {
      setComments(comments);
    });
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    const newComment = {
      id: new Date().toISOString(),
      ...commentData,
    };

    fetch(`/api/comments/${props.eventId}`, {
      method: 'POST',
      body: JSON.stringify(newComment),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setComments((prev) => [newComment, ...prev]);
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
