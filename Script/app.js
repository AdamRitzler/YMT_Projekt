const TMDBoptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_API_KEY}`
  }
};

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

async function fetchFromTMDB(path) {
  try {
    const response = await fetch(`https://api.themoviedb.org/3${path}`, TMDBoptions);
    if (!response.ok) throw new Error(`TMDB svarade ${response.status}`);
    const data = await response.json();
    console.log(data.results);
    return data.results;
  } catch (err) {
    console.error(err);
    return null;
  }
}

function toTitle(item, type) {
  const releaseDate = item.release_date ?? item.first_air_date;

  return {
    id: item.id,
    originalName: item.original_title ?? item.original_name,
    type,
    title: item.title ?? item.name,
    year: releaseDate?.slice(0, 4),
    posterPath: item.poster_path,
  };
}

async function renderPopularTitles() {
  const movieItem = await fetchFromTMDB('/movie/popular');
  const tvItem = await fetchFromTMDB('/tv/popular');
  const titleList = document.getElementById("title-list");
  titleList.replaceChildren();

  const moviesHeading = document.createElement("li");
  moviesHeading.classList.add("section-heading");
  moviesHeading.textContent = "Movies:";
  titleList.append(moviesHeading);

  for (const item of movieItem ?? []) {
    const title = toTitle(item, TYPES.MOVIE);
    const listItem = document.createElement("li");
    listItem.textContent = title.title;
    titleList.append(listItem);
  }

  const seriesHeading = document.createElement("li");
  seriesHeading.classList.add("section-heading");
  seriesHeading.textContent = "Series:";
  titleList.append(seriesHeading);

  for (const item of tvItem ?? []) {
    const title = toTitle(item, TYPES.TV_SHOW);
    const listItem = document.createElement("li");
    listItem.textContent = title.title;
    titleList.append(listItem);
  }
}
