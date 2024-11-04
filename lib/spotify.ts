import axios from 'axios';

const clientId = process.env.SPOTIFY_API_CLIENT_KEY; // 環境変数から取得
const clientSecret = process.env.SPOTIFY_API_CLIENT_SECRET; // 環境変数から取得

// アクセストークンを取得する関数
export const getAccessToken = async () => {
  const response = await axios.post('https://accounts.spotify.com/api/token', 
    new URLSearchParams({ grant_type: 'client_credentials' }), {
    headers: {
      'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.data.access_token;
};

// 曲名でトラックを検索する関数
export const searchTrackByName = async (trackName: string) => {
  const token = await getAccessToken();
  const response = await axios.get(`https://api.spotify.com/v1/search`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    params: {
      q: trackName,
      type: 'track',
      limit: 1, // 最初の1件のみ取得
    },
  });

  // 検索結果からトラック情報を取得
  return response.data.tracks.items[0];
};