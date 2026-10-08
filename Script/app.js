const STATUSES = {
    WATCHED: 'Watched',
    PLAN_TO_WATCH: 'Plan to watch',
    WATCHING: 'Watching',
    PAUSED: 'Paused',
};

const TYPES = {
    MOVIE: 'Movie',
    TV_SHOW: 'TV Show',
    ANIME: 'Anime',
};

const titles = [
    { id: 1, title: 'Inception', type: TYPES.MOVIE, status: STATUSES.WATCHED },
    { id: 2, title: 'Breaking Bad', type: TYPES.TV_SHOW, status: STATUSES.WATCHING },
    { id: 3, title: 'Attack on Titan', type: TYPES.ANIME, status: STATUSES.PAUSED },
    { id: 4, title: 'The Matrix', type: TYPES.MOVIE, status: STATUSES.PLAN_TO_WATCH },
    { id: 5, title: 'Stranger Things', type: TYPES.TV_SHOW, status: STATUSES.WATCHED },
];

function renderTitles() {
    document.getElementById("title-list").innerHTML = titles.map(title => `<li>${title.title} (${title.type}) - ${title.status}</li>`).join('');
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_API_KEY}`
  }
};

fetch('https://api.themoviedb.org/3/configuration', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));

}