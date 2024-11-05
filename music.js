
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




