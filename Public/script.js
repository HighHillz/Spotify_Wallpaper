// DOM element
const nameContainer = document.getElementById("name");
const timeContainer = document.getElementById("time");
const albumArt = document.getElementById("album-art");
const albumContainer = document.getElementById("album");
const artistContainer = document.getElementById("artists");
const creditsContainer = document.getElementById("credits");
const releasedContainer = document.getElementById("release");

// Grab the access_token from the URL
const access_token = new URLSearchParams(window.location.search).get("access_token");

// Retrieves the current song playing on Spotify and write its details to the DOM
async function fetchNowPlaying() {
  if (!access_token) {
    nameContainer.innerHTML = "⚠️ Missing access token!";
    return;
  }

  try {
    const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (response.status === 204) {
      nameContainer.innerHTML = "🎧 No song is currently playing.";
      return;
    }

    if (response.status === 401) {
      nameContainer.innerHTML = "🚫 Unauthorized - Token expired or invalid.";
      return;
    }

    if (!response.ok) {
      nameContainer.innerHTML = `❌ Error: ${response.status}`;
      return;
    }

    const data = await response.json();
    const song = data.item;

    if (song && song.name) {
      displayDetails(data, song);
    } else if (data.currently_playing_type === "ad") {
      nameContainer.innerHTML = "😬 Advertisement";
    } else {
      nameContainer.innerHTML = "🔴 Unknown";
    }

  } catch (err) {
    console.error(err);
    nameContainer.innerHTML = "💥 Network error or API failure.";
  }
}

/**
 * Displays song details
 * @param {any} data 
 * @param {any} song 
 */
function displayDetails(data, song) {
  const progress = data.progress_ms || 0;
  const length = song ? song.duration_ms : 0; // Return length only if a song is playing

  const albumImage = song.album.images[0].url;
  albumArt.src = albumImage;
  adaptColour(albumArt);

  const album = song.album.name;
  albumContainer.innerHTML = album;
  
  const released = song.album.release_date;
  releasedContainer.innerHTML = formatDate(released);

  const artists = song.album.artists.map(artist => artist.name).join(", ");
  artistContainer.innerHTML = artists;
  
  const credits = song.artists.map(artist => artist.name).join(", ");
  creditsContainer.innerHTML = credits;

  nameContainer.innerHTML = song.name;
  timeContainer.innerHTML = `${formatTime(progress)} of ${formatTime(length)}`;
}

/**
 * Converts ms to mm:ss format and returns it as a string
 * @param {any} ms 
 * @returns String
 */
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

/**
 * Formats datestamp from YYYY-MM-DD to Date Month Year and returns it as a string
 * @param {String} datestamp 
 */
function formatDate(datestamp) {
  const tokens = [datestamp.slice(0, 4), parseInt(datestamp.slice(5, 7)), datestamp.slice(8, 10)]; // [Year, Month, Date]
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${tokens[2]} ${months[tokens[1] - 1]} ${tokens[0]}`
}

/**
 * Adapts to the dominant colour in the album picture and sets the overall tone to the adapted colour
 * @param {any} album_pic 
 */
function adaptColour(album_pic) {
  const colourThief = new ColorThief();
  album_pic.onload = () => {
    const colour = colourThief.getColor(album_pic);
    const borderColour = `rgb(${colour[0]}, ${colour[1]}, ${colour[2]})`;
    const boxShadowColour = `rgba(${colour[0]}, ${colour[1]}, ${colour[2]}, 0.5)`;
    const backgroundColour = `rgba(${colour[0]}, ${colour[1]}, ${colour[2]}, 0.1)`;
    
    document.getElementById("song-info").style.border = `solid 1px ${borderColour}`;
    document.getElementById("song-info").style.boxShadow = `0 0 50px ${boxShadowColour}`;
    document.getElementById("song-info").style.backgroundColor = backgroundColour;
    nameContainer.style.color = borderColour;
  }
}

// Main code
document.addEventListener("DOMContentLoaded", () => {
  setInterval(fetchNowPlaying, 1000); // auto-refresh every 1s
});