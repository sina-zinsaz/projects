const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('layout', { body: 'index' });
});

app.get('/about', (req, res) => {
    res.render('layout', { body: 'about' });
});

app.get('/post/:id', (req, res) => {
    const posts = [
        { id: 1, title: "پست اول", content: "محتوای پست اول" },
        { id: 2, title: "پست دوم", content: "محتوای پست دوم" }
    ];
    
    const post = posts.find(p => p.id == req.params.id);
    
    if (!post) {
        return res.status(404).send("پست مورد نظر پیدا نشد.");
    }

    res.render('layout', { body: 'post', title: post.title, content: post.content });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
