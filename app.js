if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const express = require('express');
const bodyParser = require('body-parser');

const location = require('./routes/location.route');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api', location);

let port = 8080;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});


if(process.env.APP_TEST){
    module.exports = app;
}
