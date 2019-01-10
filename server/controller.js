
const request = require('request');
const querystring = require('querystring');

const client_id = process.env.client_id;
const client_secret = process.env.client_secret;
const redirect_uri = 'http://localhost:3001/callback';
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

exports.login = async (ctx) => {
  const state = generateRandomString(16);
  const scope = 'user-read-private user-read-email';
  ctx.cookies.set(stateKey, state);
  // my app requests authorization
  ctx.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
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
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };
    // here is where you request the access token from spotify
    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        access_token = body.access_token;
        refresh_token = body.refresh_token;
        const options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };
        // test to see if I get profile object (spotify web API call)
        request.get(options, (error, response, body) => {
          console.log(body); // eslint-disable-line no-console
        });
      }
    });
  }
};