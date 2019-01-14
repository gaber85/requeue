
const requestPromise = require('request-promise-native');
const querystring = require('querystring');
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi();
const User = require('./model/user-model');
const Playlist = require('./model/playlist-model');

require('dotenv').config();

let access_token = '';
let refresh_token = '';

const generateRandomString = (length) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
const stateKey = 'spotify_auth_state';
exports.test = async (ctx) => {
  ctx.body = process.env.CLIENT_ID;
  
};

exports.loginCheck = async (ctx) => {
  // check to see if user's token is still valid
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
            // const newUser = new User({
            //   userName: response.display_name.split(' ')[0],
            //   userId: response.id,
            //   userAccessToken: access_token,
            //   userRefreshToken: refresh_token,
            // });
            // newUser.save((err, newUser) => {
            //   if (err) console.error(err);
            //   console.log('New user created:\n', newUser);
            // });
            const newUser = await User.create({
              userName: response.display_name.split(' ')[0],
              userId: response.id,
              userAccessToken: access_token,
              userRefreshToken: refresh_token,
            });
            console.log('new user created: ', newUser);
            
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
  const { id } = ctx.params;
  const user = await User.findOne({ userId: id });
  spotifyApi.setAccessToken(user.userAccessToken);

  spotifyApi.getUserPlaylists(id)
    .then((data) => {
      console.log('Retrieved playlists', data.body);
    },
    (err) => {
      console.log('Something went wrong!', err);
    });

  // const playlistName =

  // spotifyApi.createPlaylist(ctx.params.id, playlistName, {public: true});
};