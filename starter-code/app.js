const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.use(cookieParser());
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', __dirname + '/views');
app.set('layout', 'layouts/main-layout');
app.set('view engine', 'ejs');


app.get('/', (req,res,next) => {
  res.render('index',{greeting: "Welcome"});
});

app.get('/random', (req,res,next) => {
  client.getRandomJoke()
  .then((response) => {
    res.send('<p>'+ response.value + '</p>');
  }).catch((err) => {
    res.send(error);
  });
});

app.get('/categories', (req,res,next) => {
  client.getJokeCategories()
  .then((response) =>  {
    res.render('categories', {categoryType: response});
  })
  .catch((err)=> {
    res.send(error);
  });
});

app.get('/categories/:category', (req,res,next) => {
  client.getRandomJoke(req.params).then((response) =>  {
    res.render('joke-by-category', repsonse);
  })
  .catch((err)=> {
    res.send(error);
  });
});

app.get('/search', (req, res, next) => {
  res.render('search-form', { items : [{ value: null }]});
 });

app.post('/search', (req, res, next) => {
  client.search(req.body.keyword)
  .then(function (response) {
    res.render('search-form', response);
  }).catch(function (err) {
    res.send(error);
  });
});


app.listen(4000, () => console.log('Heard it Bech!!'));
