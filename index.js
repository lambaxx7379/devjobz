const express = require('express');
const server = express();

const morgan = require('morgan');
server.use(morgan('dev'));

server.use(express.static('public'));

const bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

const cowsay = require('cowsay');
const Quote = require('inspirational-quotes')

server.get('/cowspiration', (req, res) => {
  const { text, author } = Quote.getQuote();

  const cow = cowsay.say({
    text: `${ text }\n\n- ${ author }`,
    W: 80,
  });

  res.send({ cow });
});

const axios = require('axios');

server.post('/job-search', async (req, res) => {
  try {
    const { description, fulltime } = req.body;

    const URL = `https://jobs.github.com/positions.json?${
      description ? `description=${ description }&` : ''
    }${
      fulltime ? 'fulltime=on' : ''
    }`;

    const { data } = await axios.get(URL);
    res.send({ results: data });
  } catch (error) {
    res.send({ error })
  }
});

server.listen(3000, () => {
  console.log('I am listening...');
});