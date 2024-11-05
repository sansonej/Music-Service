
//Client Crediential Flow: recieved from https://developer.spotify.com/documentation/web-api/tutorials/client-credentials-flow
const clientID = 'fce9e4c4fad84b619fc09a8bef2e7ce0';
const clientSecret = '17c5df930ade4d0eb5189c4a8e6f1bd1'

var credentials = clientID + ':' + clientSecret;
var base64Credentials = btoa(credentials);

//retreiving access token
const getAccessToken = async () => {
    const authOptions = {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + base64Credentials,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials', 
        }).toString()                                                                             // Converts to a URL-encoded string (e.g. 'grant_type=client_credentials')
    };

    try {
      const response = await fetch('https://accounts.spotify.com/api/token', authOptions);      //getting token from Spotify API
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

      const data = await response.json();
    
      if (data.access_token) {
        console.log('Access Token:', data.access_token);                                        // Log the access token
        return data.access_token;                                                               // Return the access token
      } else {
        console.error('Error: No access token received');
        return null;
      }
    } catch (error) {
      console.error('Error fetching access token:', error);
      return null;
    }
};

//implemet search function using Spotify Web API
const searchTracks = async (query) => {
  const token = await getAccessToken();                                                           // Fetch a new access token every time
  if (!token) {
    throw new Error('No access token available');
  }

  const SPOTIFY_API_URL = 'https://api.spotify.com/v1/search';                                    //use spotify's website
  const url = new URL(SPOTIFY_API_URL);
 
  url.searchParams.append('q', query);
  url.searchParams.append('type', 'track'); 
  url.searchParams.append('limit', 6);                                                            // Limit results

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,                                                       // Use the token for authorization
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.tracks.items;  // Return the array of tracks
  } catch (error) {
    console.error('Error fetching tracks from Spotify:', error);
    throw error;
  }
};

//export to be used in server.js
module.exports = { searchTracks };                                              




//implement s
// // Function to fetch available genre seeds from Spotify
// const getAvailableGenres = async (accessToken) => {
//   const url = 'https://api.spotify.com/v1/recommendations/available-genre-seeds';

//   const response = await fetch(url, {
//     method: 'GET',
//     headers: {
//       'Authorization': `Bearer ${accessToken}`,
//     },
//   });

//   const data = await response.json();
//   return data.genres;  // Return the list of genres
// };

// // Function to search for songs by genre
// const selectGenre = async (genre, accessToken) => {
//   const url = `https://api.spotify.com/v1/recommendations?seed_genres=${genre}&limit=10`;
//   const response = await fetch(url, {
//     method: 'GET',
//     headers: {
//       'Authorization': `Bearer ${accessToken}`,
//     },
//   });

//   const data = await response.json();
//   return data.tracks;  // Return the list of tracks based on the genre
// };

// async function searchArtists() {
//   const genreSelect = document.getElementById('genreSelect');
//   const genre = genreSelect.value;  // Get the selected genre

//   if (!genre) {
//     alert('Please select a genre');
//     return;
//   }

//   try {
//     // Fetch the artists for the selected genre
//     const accessToken = await getAccessToken();  // Make sure to implement this function for the access token
//     const artists = await fetchArtistsByGenre(genre, accessToken);

//     // Display the artists on the page
//     displayArtists(artists);

//   } catch (error) {
//     console.error('Failed to fetch artists:', error);
//   }
// }

// async function handleGenreSelection() {
//   const genreSelect = document.getElementById('genreSelect');
//   const genre = genreSelect.value;  // Get the selected genre

//   if (!genre) {
//     alert('Please select a genre');
//     return;
//   }

//   const accessToken = await getAccessToken();
//   if (!accessToken) {
//     alert('Failed to fetch access token');
//     return;
//   }

//   try {
//     // Fetch song recommendations based on the selected genre
//     const tracks = await selectGenre(genre, accessToken);
//     displayTracks(tracks);  // Display the tracks on the page
//   } catch (error) {
//     console.error('Failed to fetch song recommendations:', error);
//   }
// }

// // Function to display tracks in the UI
// function displayTracks(tracks) {
//   const trackList = document.getElementById('trackList');
//   trackList.innerHTML = '';  // Clear previous list

//   tracks.forEach(track => {
//     const li = document.createElement('li');
//     li.textContent = `${track.name} - Artist(s): ${track.artists.map(artist => artist.name).join(', ')}`;
//     trackList.appendChild(li);
//   });
// }

// // Initialize the page by populating genres and setting up event listeners
// window.onload = async () => {
//   await getAvailableGenres();

//   const genreSelect = document.getElementById('genreSelect');
//   genreSelect.addEventListener('change', handleGenreSelection);
// };

