const express = require('express');
const app = express();
const logger = require('morgan');
const axios = require('axios');
const apiKey = '880bd14b446f9609cb5ca3738cba3b60';

app.use(logger('dev'));

app.use(express.static('public'));
// Using express.urlencoded middleware
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  axios.get(url)
   .then(resp => {
      //console.log('resp is: ' + resp);
      if(resp.data.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${resp.data.main.temp} degrees in ${resp.data.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    });

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
