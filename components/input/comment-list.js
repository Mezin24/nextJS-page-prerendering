import { useState, useEffect } from 'react';
import classes from './comment-list.module.css';

function CommentList({ eventId }) {
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
  }, []);

  if (!comments) {
    return <h3 className='center'>Loading...</h3>;
  }

  if (comments.length === 0) {
    return <h3 className='center'>No Comments Yet, maybe add one?</h3>;
  }

  return (
    <ul className={classes.comments}>
      {comments.map((comment) => (
        <li key={comment.id}>
          <p>{comment.text}</p>
          <div>
            By <address>{comment.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
