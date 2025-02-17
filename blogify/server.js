const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

// تنظیمات EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// تنظیم فایل‌های استاتیک
app.use(express.static("public"));

// خواندن مقالات از فایل JSON
const posts = JSON.parse(fs.readFileSync("./data/posts.json", "utf-8"));

// صفحه اصلی (لیست مقالات)
app.get("/", (req, res) => {
    res.render("index", { title: "Blogify - وبلاگ", posts });
});

// صفحه نمایش مقاله خاص
app.get("/post/:id", (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    if (!post) return res.status(404).send("مقاله پیدا نشد!");
    res.render("post", { title: post.title, post });
});

// صفحه درباره ما
app.get("/about", (req, res) => {
    res.render("about", { title: "درباره ما" });
});

// اجرای سرور
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
