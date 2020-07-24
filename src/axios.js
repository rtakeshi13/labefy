import axios from "axios";
import qs from "querystring";

const urlTokenSpotify = "https://accounts.spotify.com/api/token";
const bodySpotify = { grant_type: "client_credentials" };
const headersTokenSpotify = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  },
  auth: {
    username: "73f01c670ed349f399db684c6a0a3e05",
    password: "dad56bdf9ebb40958fab09f06c10acb1",
  },
};
const urlSearchSpotify = "https://api.spotify.com/v1/search";


const url =
  "https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists";

const headers = { headers: { Authorization: "renan-takeshi-mello" } };

export async function getSpotifyToken() {
  try {
    const response = await axios.post(
      urlTokenSpotify,
      qs.stringify(bodySpotify),
      headersTokenSpotify
    );
    return response.data.access_token;
  } catch (err) {
    console.log(err);
  }
}

export async function getAllPlaylists() {
  try {
    const response = await axios.get(url, headers);
    console.log(response.data.result.list)
    return response.data.result.list;
  } catch (err) {
    console.log(err);
  }
}

export async function getPlaylistTracks(playlistId) {
  try {
    const response = await axios.get(url + `/${playlistId}/tracks`, headers);
    return response.data.result.tracks;
  } catch (err) {
    console.log(err);
  }
}

export async function deletePlaylist(playlistId) {
  try {
    const response = await axios.delete(url + `/${playlistId}`, headers);
    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function createPlaylist(name) {
  try {
    const response = await axios.post(url, { name: name }, headers);
    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function addTrackToPlaylist(playlistId,body) {
  try {
    const response = await axios.post(
      url + `/${playlistId}/tracks`,
      body,
      headers
    );
    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function removeTrackFromPlaylist(playlistId, trackId) {
    try {
      const response = await axios.delete(url + `/${playlistId}/tracks/${trackId}`, headers);
      return response
    } catch (err) {
      console.log(err);
    }
  
}

export async function searchSpotify(query, token) {
  try {
    const headersSearchSpotify = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      urlSearchSpotify + `?q=${query}&type=track&market=BR`,
      headersSearchSpotify
    );
    return response.data.tracks.items;
  } catch (err) {
    console.log(err);
  }
}
