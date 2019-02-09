# Requeue
<p align="center">
<img alt="requeue logo" src="https://github.com/gaber85/requeue/blob/master/Extras/Logo.png?raw=true" />
</p>
Receive and queue song requests in a closed network with an intuitive platform that provides you with control on what song plays next.

## Screenshots

<img alt="Requeue screenshots" src="https://github.com/gaber85/requeue/blob/master/Extras/Requeue%20Screenshots.png?raw=true" />

## Getting Started

Getting started with Requeue requires a couple of steps involving the following:

1. Clone the repository:

   `$ git clone https://github.com/gaber85/docco-frontend.git
   $ cd docco-frontend`

2. Install global and local dependencies:

   [Node](https://nodejs.org/en/): Navigate to page and download

   [Npm](https://www.npmjs.com/): Package manager for JavaScript

   [MongoDB](https://www.mongodb.com/): [macOS](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/), [Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/), [Linux](https://docs.mongodb.com/manual/administration/install-on-linux/)

   Installing dev dependencies for client and server:

   `$ cd client
   $ npm i`

   &

   `$ cd server
   $ npm i`

3. Start MongoDB using terminal: `$ mongod`

4. Update the .env file with the required Spotify api secret and database url

5. Start the back-end development server:

   `$ node index.js`

6. Run the front-end development server:

   `$ npm start`

## FAQ

#### How do I get started?

From the landing page, click sign in with Spotify and accept the permissions.

#### How do I host a new session?

Once you are logged in and in the wecome page, click on the 'Host' button. This will automatically generate a code word that can be shared with users to join the playlist. In order to use the host feature, the user needs to hold a Spotify Premium account.

#### Can I add any song to the list?

Any song found in the Spotify database can be added, so long as the song is available in your region. Navigate to the search area by clicking on the search button at the bottom of the dashboard page.

#### How do I play music on the browser?

After choosing to host a session, the user will be taken to the host dashboard where a play button will appear at the top of the page. Press play and a web player will load with the basic music controls. Pressing the arrow down on the right hand side of the screen will start playing songs from the created playlist.



## Tech Stack

[React](https://github.com/facebook/react) - A declarative, efficient, and flexible JavaScript library for building user interfaces. 

[Redux](https://github.com/reduxjs/redux) - Predictable state container for JavaScript apps.

[Spotify API](https://github.com/thelinmichael/spotify-web-api-node) - A Node.js wrapper for Spotify's Web API.

[Koa](https://github.com/koajs/koa) - Expressive middleware for node.js using ES2017 async functions

[MongoDB](https://www.mongodb.com/) - A NoSQL document database

## Contributing

Requeue is an open source project and contributions are welcome. Please fork the repo and submit a pull request for review.

## Authors

Gabriel Riera: [Github](https://github.com/gaber85) & [LinkedIn](https://www.linkedin.com/in/griera/)
