
const requestPromise = require('request-promise-native');
const querystring = require('querystring');
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi();
const User = require('./model/user-model');
const Playlist = require('./model/playlist-model');

require('dotenv').config();

let access_token = '';
let refresh_token = '';
const stateKey = 'spotify_auth_state';

const generateRandomString = (length) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

exports.login = async (ctx) => {
  // const id = ctx.params.id ? ctx.params.id : '';
  // const user = id ? await User.findOne({ userId: id }) : '';
  // if (user) {
  //   spotifyApi.setRefreshToken(user.userRefreshToken);
  //   spotifyApi.refreshAccessToken()
  //     .then((data) => {
  //       console.log('The access token has been refreshed!');
  //       spotifyApi.setAccessToken(data.body['access_token']);
  //       ctx.redirect('http://localhost:3000/intro?' + 
  //         querystring.stringify({
  //           access_token: data.body['access_token'],
  //           refresh_token: data.body['refresh_token'],
  //         })
  //       );
  //     },
  //     (err) => {
  //       console.log('Could not refresh access token', err);
  //     });
  // }

  const state = generateRandomString(16);
  const scope = 'user-read-private user-read-email user-read-birthdate streaming user-read-private user-library-modify playlist-read-collaborative user-read-currently-playing playlist-modify-public user-read-playback-state user-modify-playback-state';
  ctx.cookies.set(stateKey, state);
  // my app requests authorization
  ctx.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.CLIENT_ID,
      scope: scope,
      redirect_uri: process.env.REDIRECT_URI,
      state: state
    })
  );
};

exports.callback = async (ctx) => {
  // the callback was executed by the spotify api and sent with the authorization code
  const code = ctx.request.query.code || null;
  const state = ctx.request.query.state || null;
  const storedState = ctx.cookies.get(stateKey) || null;

  if (state === null || state !== storedState) {
    // if the state and storeState don't match then produce error
    ctx.redirect('/#' + 
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    // else clear the cookie and create post request options to request token
    ctx.cookies.set(stateKey, '');
    const authOptions = {
      method: 'POST',
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
      },
      json: true
    };
    // here is where you request the access token from spotify
    await requestPromise(authOptions)
      .then(async (body) => {
        access_token = body.access_token;
        refresh_token = body.refresh_token;
        spotifyApi.setAccessToken(access_token);
        const options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };
        await requestPromise(options)
          .then( async (response) => {
            console.log(response); // eslint-disable-line no-console

            const newUser = await User.create({
              userName: response.display_name.split(' ')[0],
              userId: response.id,
              userAccessToken: access_token,
              userRefreshToken: refresh_token,
            });
            console.log('new user created: ', newUser); // eslint-disable-line no-console
            
            ctx.body = response;
            // need to save to database user profile and access token
          })
          .catch((err) => {
            console.log(err); // eslint-disable-line no-console
          });
        ctx.redirect('http://localhost:3000/intro?' + 
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token
            }));
      })
      .catch((err) => {
        console.log(err); // eslint-disable-line no-console
        ctx.redirect('/#' + 
            querystring.stringify({
              error: 'invalid_token'
            }));
      });
  }//end of else statement
};

exports.createSession = async (ctx) => {
  // generate code word
  const generateCodeWord = () => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codeWord = '';
    for (let i = 0; i < 5; i++) {
      codeWord += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return codeWord;
  };
  const { id } = ctx.params;
  const codeWord = generateCodeWord();
  const playlist = await Playlist.findOne({ userId: id, playlistName: 'requeue' });
  console.log('playlist if it exists in the db:', playlist);
  
  if (playlist) {
    ctx.body = {
      playlistId: playlist.playlistId,
      codeWord: playlist.codeWord,
    };

  } else {
    try {
      // spotifyApi.setAccessToken('BQCD3gOL9G4IuTdTcZl2DhSUKwBtL6yuqBcfxb-fWgeafuLgEIwcaOdwjen-dbRZgwvtFJZGIaP3drzRPRxD0STq-CKRPM481eIQnjDsFvxguLr-hTDycKpZWV_67rfuCZHNqK1JoYjuW-sfUhlzihCzNjXTcVlCSizVrMPDDsBRQ25sL1JawA0QLaltMd1fFf5jDro431y9TR5v1a1y');
      const data = await spotifyApi.createPlaylist(id, 'requeue', { public: true });
      console.log('data:', data);
      
      console.log('data.body.id', data.body.id);
      const newPlaylist = await Playlist.create({
        userId: id,
        playlistName: 'requeue',
        playlistId: data.body.id,
        songs: [],
        codeWord: codeWord,
      });
      console.log('Created new playlist:', data.body.id);
      ctx.body = {playlistId: data.body.id, codeWord: codeWord};
      ctx.status =201;
    } catch (err) {
      if (err) console.log('Something went wrong!', err);
    }
  }
};

exports.search = async (ctx) => {
  console.log('enters search function');
  
  const { item } = ctx.params;
  //spotifyApi.setAccessToken( 'BQAxfmS5NN5pUo3bDLi006acm2cApdUhcj4J-L7nyOKe1u-ul0SZFwnJwznIEvvh5U_Q9l3kriRxG46svo5POFmiabL8-j0B3PBppUSHLdKD4JTLC51j4dPGHSryp6gmRaI86Ckb2yu1WCw9UoDtg-hXMkEj0MbE2tlkEewbX64ACe5Qg_TzNcry0uiITw67nuyr2n7Jvgc_GMiijI9F');
  try {
    const Results = await spotifyApi.searchTracks(item);
    const { items } = Results.body.tracks;
    const tracks = items.map((track) => {
      const obj = {
        id: track.id,
        name: track.name,
        artists: track.artists.map((artist) => artist.name).join(', '),
        image: track.album.images[0].url,
        album: track.album.name,
      };
      return obj;
    });
    console.log('search results: ', tracks);
    ctx.body = tracks;
  } catch (err) {
    if (err) console.error('something went wrong while searching', err);
  }
};

exports.addToPlaylist = async (ctx) => {
  try {
    const track = ctx.request.body;
    console.log('track', track);
    const { id, playlistId } = ctx.params;
    //spotifyApi.setAccessToken( 'BQAxfmS5NN5pUo3bDLi006acm2cApdUhcj4J-L7nyOKe1u-ul0SZFwnJwznIEvvh5U_Q9l3kriRxG46svo5POFmiabL8-j0B3PBppUSHLdKD4JTLC51j4dPGHSryp6gmRaI86Ckb2yu1WCw9UoDtg-hXMkEj0MbE2tlkEewbX64ACe5Qg_TzNcry0uiITw67nuyr2n7Jvgc_GMiijI9F');
    
    const addedSong = await spotifyApi.addTracksToPlaylist(playlistId, [`spotify:track:${id}`],);
    await Playlist.findOneAndUpdate({playlistId:playlistId}, {$push:{songs:track}}, {useFindAndModify: false});
    const updatedPlaylist = await Playlist.findOne({playlistId:playlistId});

    console.log('added song to playlist:', track);
    ctx.body = updatedPlaylist;
    ctx.status = 200;
  } catch (err) {
    if (err) console.error('something went wrong with adding song to playlist', err);
    ctx.body = {
      errors: [err],
    };
    ctx.status = 500;
  }
};

exports.getPlaylist = async (ctx) => {
  const { playlistId } = ctx.params;
  try {
    const playlist = await Playlist.findOne({playlistId:playlistId});
    if (!playlist.songs) ctx.body = 'no songs in the list';
    const { songs } = playlist;
    ctx.body = songs;
    ctx.status = 200;
  } catch (err) {
    if (err) console.error('something went wrong with getting playlist', err);
    ctx.body = {
      errors: [err],
    };
    ctx.status = 500;
  }
};

exports.removeSong = async (ctx) => {
  const { songId, playlistId } = ctx.params;
  console.log('song id, playlist', songId, playlistId);
  
  try { // finds song in the database and removes it
    //spotifyApi.setAccessToken('BQAnXx6XGAZpGN81qEcJiwHOdMqODGYLX7za8TpNxWE2lsai0st4gIWHOdwlP0RFvCTDfRLD4-WvJUXQ9zFtAjIl-t3jvwzMIBgKVb_e0LZSLhbj7L39Z_2lLDRnicFUTjpm5f0WuBna3FVYRlgtxPwAizMVTHVVAarmI5r7V0yA293kyDVqmaarjJJAEGh4uKkttOiMmUSjFVHBHzdr');
    await Playlist.findOneAndUpdate({playlistId:playlistId}, {$pull:{songs:{id: songId}}},{multi: true, useFindAndModify: false});
    const playlist = await Playlist.findOne({playlistId:playlistId});
    const { songs } = playlist;
    console.log('removed song from playlist', songs);
    // removes song from spotify playlist
    await spotifyApi.removeTracksFromPlaylist(playlistId, [
      {
        uri:`spotify:track:${songId}`
      }
    ]);

    ctx.body = songs;
  } catch (err) {
    if (err) console.error('something went wrong with removing song', err);
    ctx.body = {
      errors: [err],
    };
    ctx.status = 500;
  }
};