import fs from 'fs';
import path from 'path';

const buildFilePath = () => {
  return path.join(process.cwd(), 'data', 'email-data.json');
};

const getEmails = (filePath) => {
  const dataJson = fs.readFileSync(filePath);
  return JSON.parse(dataJson);
};

const handler = (req, res) => {
  const { method, body } = req;
  if (method === 'POST') {
    const newEmail = {
      id: new Date().toISOString(),
      ...body,
    };
    const filePath = buildFilePath();
    const emails = getEmails(filePath);
    emails.push(newEmail);
    fs.writeFileSync(filePath, JSON.stringify(emails));
    res.status(201).json({ message: 'Success!', email: newEmail });
  }
};

export default handler;
