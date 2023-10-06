const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Temporary in-memory storage for blog posts
const posts = [];
let postId = 1; // A simple counter to assign unique IDs to posts

// Route to create a new blog post
app.post('/posts/create', (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).send({ error: 'Title and Content are required.' });
    }

    const newPost = {
        id: postId++,
        title,
        content
    };

    posts.push(newPost);
    res.status(201).send({ id: newPost.id });
});

// Route to read a blog post by ID
app.get('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));

    if (!post) {
        return res.status(404).send({ error: 'Post not found.' });
    }

    res.send(post);
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

module.exports = app; // Export for testing
