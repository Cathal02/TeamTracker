const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const fileUpload = require('express-fileupload');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

const passport = require('./passport/setup');
const auth = require('./routes/auth');
const products = require('./routes/products');

const MONGO_URI = 'mongodb://127.0.0.1:27017/';

mongoose
	.connect(MONGO_URI, { useNewUrlParser: true })
	.then(console.log('MONGODB connected.'))
	.catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.use(
	session({
		secret: 'Ultra secret key',
		resave: false,
		saveUninitialized: true,
		store: new MongoStore({ mongooseConnection: mongoose.connection })
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(fileUpload());

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

app.use('/api/auth', auth);
app.use('/api/products', products);
