// const express = require('express');
// const path = require('path');
// const engine = require('ejs-mate');

// const app = express();

// app.engine('ejs', engine); // تنظیم ejs-mate به عنوان موتور قالب
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// app.get('/', (req, res) => {
//     res.render('index', { title: 'صفحه اصلی' });
// });

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });

const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// صفحه اصلی
app.get('/', (req, res) => {
    res.render('layout', { body: 'index' });
});

// صفحه درباره ما
app.get('/about', (req, res) => {
    res.render('layout', { body: 'about' });
});

// صفحه پست‌ها
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
