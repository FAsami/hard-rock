const serachBtn = document.getElementById('search-button');
const songLyrics = document.getElementById('lyrics');
const searchField = document.getElementById('search-input');
const serachResult = document.getElementById('search-result');

//Clicking on the search  button
serachBtn.addEventListener('click', handleSearch);

//handeling the search
function handleSearch() {
  const searchValue = searchField.value;
  const url = `https://api.lyrics.ovh/suggest/${searchValue}`;
  //removing previous song lyrics
  songLyrics.innerHTML = '';
  //Fetching data from the api
  fetch(url)
    .then((response) => response.json())
    .then((jsonData) => displaySearchResult(jsonData.data));
}
//Displaying serach result to the UI
function displaySearchResult(songs) {
  serachResult.innerHTML = '';

  if (songs.length === 0)
    serachResult.innerHTML = 'No song found. Try with another keyword';

  const songData = songs.slice(0, 10);
  songData.map((song) => {
    serachResult.innerHTML += `
        <div class="single-result row align-items-center my-3 p-3">
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album  ${song.album.title} <br> Album by <span>${song.artist.name}</span></p>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button class="btn btn-success" onclick = "handleLyrics('${song.artist.name}','${song.title}')">Get Lyrics</button>
        </div>
        </div>`;
  });
}

//Fetching song lyrics
function handleLyrics(artist, title) {
  const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
  fetch(url)
    .then((response) => response.json())
    .then((jsonData) => displayLyrics(jsonData, title, artist));
}
//Displaying song lyrics to the UI
function displayLyrics(data, title, artist) {
  window.scrollTo(100, 0);
  if (!data.lyrics) {
    songLyrics.innerHTML = `
        <button class="btn go-back">&lsaquo;</button>
          <h2 class="text-success mb-4">${title} <small class = "text-light> by</small> ${artist}</h2>
          <pre class="lyric text-white">${data.error}</pre>`;
  } else {
    songLyrics.innerHTML = `
        <button class="btn go-back">&lsaquo;</button>
          <h2 class="text-success mb-4">${title} <small class = "text-light"> by</small> ${artist}</h2>
          <pre class="lyric text-white">${data.lyrics}</pre>`;
  }
}
