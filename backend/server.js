require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Load MongoDB connection URI from environment variables
const mongoURI = process.env.MONGO_URI;

console.log('MongoURI:', mongoURI); // Debugging line to check if MONGO_URI is loaded

if (!mongoURI) {
  console.error('MongoDB connection URI is not defined.');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Define a schema and model for blog posts
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  amount: Number // Changed from EnterAmount to amount
});

const Post = mongoose.model('Post', postSchema);

app.use(express.json());
app.use(cors());

// Get all blog posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving posts' });
  }
});

// Get a specific blog post by ID
app.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving post' });
  }
});

// Create a new blog post
app.post('/posts', async (req, res) => {
  try {
    const { title, content, amount } = req.body;
    const newPost = new Post({ title, content, amount });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ message: 'Error creating post' });
  }
});

// Update an existing blog post
app.put('/posts/:id', async (req, res) => {
  try {
    const { title, content, amount } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, amount },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: 'Error updating post' });
  }
});

// Delete an existing blog post
app.delete('/posts/:id', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error deleting post' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});