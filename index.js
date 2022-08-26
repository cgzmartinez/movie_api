const express = require('express');
  morgan = require('morgan');

const app = express();

app.use(morgan('common'));
app.use(express.static('public'));

let topTenMovies = [
  {
    title:'Parasite',
    year: 2019
  },
  {
    title:'Tenet',
    year: 2020
  },
  {
    title:'Minari',
    year: 2021
  },
  {
    title:'The Godfather',
    year: 1972
  },
  {
    title:'John Wick',
    year: 2014
  },
  {
    title:'Burning',
    year: 2018
  },
  {
    title:'Oldboy',
    year: 2005
  },
  {
    title:'Memoir of a Murderer',
    year: 2017
  },
  {
    title:'Sicario',
    year: 2015
  },
  {
    title: 'Everything Everywhere All at Once',
    year: 2022
  },
];

app.get('/', (req, res) => {
  res.send('<h1>Top Ten Movies of All Time</h1>');
});

app.get('/movies',(req, res) =>{
  res.json(topTenMovies);
});

app.use((err, req, res, next) =>{
  consile.log(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(8080, () => {
  console.log('Your app is running on port 8080');
});
