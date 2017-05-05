const express = require ('express');
const app = express();
const bodyParser = require ("body-parser");
const path = require ('path');
const nunjucks = require('nunjucks');
var fs = require('fs');  
var http = require('http').Server(app);
var io = require('socket.io')(http);
var player = require('play-sound')(opts = {})
// var Player = require('player');

http.listen(3200, () => {
	console.log('Express server listening on port 3200');
});

nunjucks.configure('views', {
	autoescape: true,
	cache: false,
	express: app,
	watch: true
});

app.use ('/public', express.static ('public'))

app.engine ('html', nunjucks.render);

app.set ('view engine', 'html');

app.set ('views', path.join (__dirname, '/views'));


app.use (bodyParser.urlencoded ({
	extended: true
}));

app.use (bodyParser.json());

//------------Set up router --------------------
// require('./router/router')(app);

app.get ('/', (req, res) => {

    // $ mplayer foo.mp3 
    // player.play('./public/mp3/behind_girl.wav', function(err){
    //     if (err) throw err
    // })
    res.render ('index.html');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

