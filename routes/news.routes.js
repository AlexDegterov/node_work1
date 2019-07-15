const express = require('express'),
  router = express.Router(),
  axios = require('axios'),
  cheerio = require('cheerio');

router.get('/', function (req, res) {
  const url = 'https://tut.by';

  axios.get(url)
    .then(response => {
      var news = [];
      getData(response.data);
      function getData(html) {
        const $ = cheerio.load(html);
        $('div#latest div.news-entry a.entry__link').each((i, elem) => {
          news.push({
            title: $(elem).find('span.entry-cnt span.entry-head').text(),
            url: $(elem).attr('href'),
          })
        })
      }
      console.log(news);
      res.render('news', { news: news });

    })
    .catch(error => {
      console.log(error);
    })

});

module.exports = router;