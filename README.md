# 🎬 YMT – Your Movie Tracker

A mobile-first web app (PWA) for keeping track of movies, TV shows and anime – what you've seen, what you're watching right now and what you want to watch next.

> 🚧 **Work in progress** – a hobby project where I'm learning HTML, CSS and JavaScript.

## ✨ Features

**Done**
- Home page with popular movies and TV shows from TMDB
- Cards with poster, title, year and type in swipeable carousels (with arrow buttons)
- Detail view that opens when you click a card

**Coming up**
- More info in the detail view: description, rating, genre, language, streaming services and more
- Search for titles
- **My List** – save titles with a status:
  - ✅ Watched
  - ▶️ Watching
  - ⏸️ Paused
  - 📌 Plan to watch
- For TV shows: number of seasons and episodes, and an episode list where you can check off watched episodes

## 🛠️ Tech

- Plain **HTML, CSS and JavaScript** – no frameworks
- **localStorage** for saved data
- **[TMDB API](https://www.themoviedb.org/documentation/api)** for movie and TV data
- Hosted on **GitHub Pages**

## 📁 Project structure

```
YMT_Projekt/
├── HTML/
│   └── index.html
├── CSS/
│   └── style.css
└── Script/
    ├── app.js
    └── config.js   ← API token (not committed)
```

## 🙏 Credits

Movie and TV data provided by [TMDB](https://www.themoviedb.org/).
*This product uses the TMDB API but is not endorsed or certified by TMDB.*
