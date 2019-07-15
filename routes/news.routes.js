const express = require('express'),
  router = express.Router(),
  axios = require('axios'),
  cheerio = require('cheerio');

router.get('/', async function (req, res, next) {
  const SITE = req.query.site;

  switch (SITE) {
    case "tut_by":
      await getTutBy(res, SITE);
      break;

    case "belta_by":
      await getBeltaBy(res, SITE);
      break;

    case "interfax_by":
      await getInterfaxBy(res, SITE);
      break;

    default:
      await getTutBy(res, SITE);
      break;
  }
});

function getTutBy(res, site) {
  var params = {};
  params.url = 'https://tut.by';
  params.search = 'div#latest div.news-entry';
  params.searchTitle = 'a.entry__link span.entry-cnt span.entry-head';
  params.searchUrl = 'a.entry__link';
  params.searchTime = 'a.entry__link span.entry-cnt span.entry-meta span.entry-time > span';
  scrapping(res, params, 'news', site);
}

function getBeltaBy(res, site) {
  var params = {};
  params.url = 'https://www.belta.by/';
  params.search = 'div.last_news_item';
  params.searchTitle = 'div.news_block_info span + a';
  params.searchUrl = 'div.news_block_info span + a';
  params.searchTime = 'div.news_block_date';
  scrapping(res, params, 'news', site);
}

function getInterfaxBy(res, site) {
  var params = {};
  params.url = 'https://www.interfax.by/';
  params.search = 'ul.news-ls li';
  params.searchTitle = 'h1 > a';
  params.searchUrl = 'h1 > a';
  params.searchTime = 'div > span';
  scrapping(res, params, 'news', site);
}

function scrapping(res, params, template, site) {
  const url = params.url;
  axios.get(url)
    .then(response => {
      var news = [];
      getData(response.data);
      function getData(html) {
        const $ = cheerio.load(html);
        $(params.search).each((i, elem) => {
          news.push({
            title: $(elem).find(params.searchTitle).text(),
            url: $(elem).find(params.searchUrl).attr('href'),
            time: $(elem).find(params.searchTime).text().trim(),
          })
        })
      }
      if (!site) return res.render(template, { news });
      return res.send(news);
    })
    .catch(error => {
      console.log(error);
    })
  return;
}

module.exports = router;