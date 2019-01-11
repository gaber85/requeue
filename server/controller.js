
const request = require('request');
const querystring = require('querystring');
require('dotenv').config();

const client_id = process.env.client_id; //
const client_secret = process.env.client_secret; //process.env.client_secret;
const redirect_uri = process.env.redirect_uri;
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
  console.log('test');
};

exports.login = async (ctx) => {
  console.log(client_id);
  const state = generateRandomString(16);
  console.log('state at login:', state);

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
    })
  );
  console.log('redirected');
};

exports.callback = async (ctx) => {
  console.log('entered callback');
  // the callback was executed by the spotify api and sent with the authorization code
  const code = ctx.request.query.code || null;
  const state = ctx.request.query.state || null;
  const storedState = ctx.cookies.get(stateKey) || null;

  console.log('stateKey', stateKey);
  console.log('cookies', ctx.cookies.get(stateKey));
  console.log('code',code);
  console.log('state', state);
  console.log('storedState',storedState);
  console.log('past the code');
  
  
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
        'Authorization': 'Basic ' + (Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };
    // here is where you request the access token from spotify
    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        access_token = body.access_token;
        console.log('access token', access_token);
        refresh_token = body.refresh_token;
        const options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };
        // test to see if I get profile object (spotify web API call)
        request.get(options, (error, response, body) => {
          console.log(body); // eslint-disable-line no-console
          ctx.body = body;
        });
        // passes the token to the browser to make requests from there
        ctx.redirect('http://localhost:3000/dashboard?' + 
        querystring.stringify({
          access_token: access_token,
          refresh_token: refresh_token
        }));
        console.log('last redirect');
        
      } else {
        ctx.redirect('/#' + 
        querystring.stringify({
          error: 'invalid_token'
        }));
      }
    });
  }
};