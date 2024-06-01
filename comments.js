// Create web server

// Import the express library
const express = require('express');
// Import the body-parser library
const bodyParser = require('body-parser');
// Import the comments module
const comments = require('./comments');

// Create a new web server
const app = express();

// Add the body parser middleware
app.use(bodyParser.json());

// Create a new comment
app.post('/comments', (req, res) => {
  const { comment } = req.body;
  if (!comment) {
    return res.status(400).json({ error: 'Missing comment' });
  }
  const newComment = comments.create(comment);
  res.json(newComment);
});

// Get all comments
app.get('/comments', (req, res) => {
  const allComments = comments.getAll();
  res.json(allComments);
});

// Get a single comment
app.get('/comments/:id', (req, res) => {
  const comment = comments.get(req.params.id);
  if (!comment) {
    return res.status(404).json({ error: 'Comment not found' });
  }
  res.json(comment);
});

// Update a comment
app.put('/comments/:id', (req, res) => {
  const { comment } = req.body;
  if (!comment) {
    return res.status(400).json({ error: 'Missing comment' });
  }
  const updatedComment = comments.update(req.params.id, comment);
  if (!updatedComment) {
    return res.status(404).json({ error: 'Comment not found' });
  }
  res.json(updatedComment);
});

// Delete a comment
app.delete('/comments/:id', (req, res) => {
  const deletedComment = comments.delete(req.params.id);
  if (!deletedComment) {
    return res.status(404).json({ error: 'Comment not found' });
  }
  res.json(deletedComment);
});

// Start the web server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});