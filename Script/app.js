const TMDBoptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    // typeof-kontrollen gör att appen inte kraschar om config.js saknas
    Authorization: `Bearer ${typeof TMDB_API_KEY !== 'undefined' ? TMDB_API_KEY : ''}`
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

async function fetchFromTMDB(path) {
  try {
    const response = await fetch(`https://api.themoviedb.org/3${path}`, TMDBoptions);
    if (!response.ok) throw new Error(`TMDB svarade ${response.status}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function getSpecificTitle(id, type) {
  const path = type === TYPES.MOVIE ? `/movie/${id}` : `/tv/${id}`;
  const titleDetails = await fetchFromTMDB(path);
  console.log(titleDetails);
  return titleDetails;
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

function renderTitleSection(titleList, headingText, items, type) {
  const section = document.createElement("li");
  section.classList.add("title-section");

  const header = document.createElement("div");
  header.classList.add("carousel-header");

  const heading = document.createElement("h2");
  heading.classList.add("section-heading");
  heading.textContent = headingText;
  header.append(heading);

  const carousel = document.createElement("ul");
  carousel.classList.add("title-carousel");
  carousel.setAttribute("aria-label", headingText.replace(":", ""));

  for (const item of items ?? []) {
    carousel.append(createTitleCard(toTitle(item, type)));
  }

  const previousButton = createCarouselButton("Föregående titlar", "‹");
  const nextButton = createCarouselButton("Nästa titlar", "›");
  previousButton.addEventListener("click", () => {
    carousel.scrollBy({ left: -carousel.clientWidth, behavior: "smooth" });
  });
  nextButton.addEventListener("click", () => {
    carousel.scrollBy({ left: carousel.clientWidth, behavior: "smooth" });
  });

  const controls = document.createElement("div");
  controls.classList.add("carousel-controls");
  controls.append(previousButton, nextButton);
  header.append(controls);

  section.append(header, carousel);
  titleList.append(section);
  carousel.addEventListener("scroll", () => updateCarouselButtons(carousel));
  updateCarouselButtons(carousel);
}

function updateCarouselButtons(carousel) {
  const [previousButton, nextButton] = carousel.parentElement.querySelectorAll(".carousel-button");
  previousButton.disabled = carousel.scrollLeft <= 0;
  nextButton.disabled =
    carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 1;
}

function createCarouselButton(label, text) {
  const button = document.createElement("button");
  button.type = "button";
  button.classList.add("carousel-button");
  button.setAttribute("aria-label", label);
  button.textContent = text;
  return button;
}

window.addEventListener("resize", () => {
  document.querySelectorAll(".title-carousel").forEach(updateCarouselButtons);
});

function createTitleCard(title) {
  const card = document.createElement("li");
  card.classList.add("title-card");
  card.setAttribute("role", "button");
  card.tabIndex = 0;
  card.addEventListener("click", () => handleTitleCardClick(title));
  card.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleTitleCardClick(title);
    }
  });

  const posterPath = createTitlePoster(title);
  if (posterPath) {
    const poster = document.createElement("img");
    poster.src = posterPath;
    poster.alt = `Poster för ${title.title}`;
    card.append(poster);
  }

  const details = document.createElement("div");
  details.classList.add("title-card-details");

  const titleElement = document.createElement("h3");
  titleElement.textContent = title.title;
  details.append(titleElement);

  const metadata = [title.year, title.type].filter(Boolean).join(" · ");
  if (metadata) {
    const metadataElement = document.createElement("p");
    metadataElement.textContent = metadata;
    details.append(metadataElement);
  }

  card.append(details);
  return card;
}

function createTitlePoster(title) {
  if (!title.posterPath) return null;
  return `https://image.tmdb.org/t/p/w342${title.posterPath}`;
}

async function handleTitleCardClick(title) {
  showView("view-details");

  const poster = document.getElementById("title-image");
  const posterPath = createTitlePoster(title);
  if (posterPath) {
    poster.src = posterPath;
    poster.alt = `Poster för ${title.title}`;
    poster.hidden = false;
  } else {
    poster.removeAttribute("src");
    poster.alt = "";
    poster.hidden = true;
  }

  document.getElementById("title-name").textContent = title.title;

 const titleDetails = await getSpecificTitle(title.id, title.type);

  // Lägg kortets klickbeteende här.
  /*
on klick öppna detaljsidan för titeln.
ska innehålla mer information om titeln, som beskrivning, betyg, skådespelare, etc. och eventuellt länkar till var man kan titta på den.
Knapp för att lägga till titeln i användarens lista över titlar, och att välja status (t.ex. "Plan to watch", "Watching", "Watched") och kunna ta bort.
 */
}

function showView(viewId) {
  document.querySelectorAll(".view").forEach(view => {
    view.classList.toggle("hidden", view.id !== viewId);
  });

}

document.getElementById("back-button").addEventListener("click", () => {
  showView("view-home");
});

function showStatusMessage(text) {
  const statusMessage = document.getElementById("status-message");
  statusMessage.textContent = text;
  statusMessage.hidden = !text;
}

async function renderPopularTitles() {
  showStatusMessage("Loading titles…");

  const [movieItem, tvItem] = await Promise.all([
    fetchFromTMDB('/movie/popular'),
    fetchFromTMDB('/tv/popular'),
  ]);

  const movie = movieItem?.results;
  const serie = tvItem?.results;
  
  const titleList = document.getElementById("title-list");
  titleList.replaceChildren();

  if (movieItem) renderTitleSection(titleList, "Movies:", movie, TYPES.MOVIE);
  if (tvItem) renderTitleSection(titleList, "Series:", serie, TYPES.TV_SHOW);

  if (!movieItem && !tvItem) {
    showStatusMessage("Could not load titles. Please try again later.");
  } else if (!movieItem || !tvItem) {
    showStatusMessage("Some titles could not be loaded.");
  } else {
    showStatusMessage("");
  }
}
renderPopularTitles();