const steam = require('steam-web');

const steamSess = new steam ({
    apiKey: 'process.env.STEAM_APIKEY',
    format: 'json'
});

const steamNews = () => {return steamSess.getNewsForApp({
    appid: 440,
    count: 200,
    maxlength: 300,
    callback: (err, data) => {
        let articles = [];
        for (let i = 0; i <= 3; i++) {
            let article = data.appnews.newsitems[Math.floor(Math.random() * 200)];
            articles.push(article);
        }
        console.log(articles);
        return articles;
    }
    
})};

module.exports = steamNews;

