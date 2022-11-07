import fs from 'fs';
import path from 'path';

const buildFilePath = () => {
  return path.join(process.cwd(), 'data', 'comments.json');
};

const getComments = (filePath) => {
  const dataJson = fs.readFileSync(filePath);
  return JSON.parse(dataJson);
};

const handler = (req, res) => {
  const { id } = req.query;
  const filePath = buildFilePath();
  const comments = getComments(filePath);
  if (req.method === 'POST') {
    const newComment = req.body;
    comments[id] = comments[id] ? [newComment, ...comments[id]] : [newComment];
    fs.writeFileSync(filePath, JSON.stringify(comments));
    return res.status(201).json({ status: 'success', comment: newComment });
  } else {
    const eventComments = comments[id];
    return res.status(200).json({ status: 'success', comments: eventComments });
  }
};

export default handler;
