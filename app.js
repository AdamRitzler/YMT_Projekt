const STATUSES = {
  WATCHED: 'watched',
  PLAN_TO_WATCH: 'plan_to_watch',
  WATCHING: 'watching',
  PAUSED: 'paused',
};

const TYPES = {
  MOVIE: 'movie',
  TV_SHOW: 'tv_show',
  ANIME: 'anime',
};

const titles = [
    { id: 1, title: 'Inception', type: TYPES.MOVIE, status: STATUSES.WATCHED },
    { id: 2, title: 'Breaking Bad', type: TYPES.TV_SHOW, status: STATUSES.WATCHING },
    { id: 3, title: 'Attack on Titan', type: TYPES.ANIME, status: STATUSES.PAUSED },
    { id: 4, title: 'The Matrix', type: TYPES.MOVIE, status: STATUSES.PLAN_TO_WATCH },
    { id: 5, title: 'Stranger Things', type: TYPES.TV_SHOW, status: STATUSES.WATCHED },
];

document.getElementById("title-list").innerHTML = titles.map(title => `<li>${title.title}  (${title.type}) - ${title.status}</li>`).join('');

console.log('All Titles:', titles);