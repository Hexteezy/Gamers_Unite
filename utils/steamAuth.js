const steam = require('steam-web');

const steamSess = new steam ({
    apiKey: 'process.env.STEAM_APIKEY',
    format: 'json'
});

steamSess.getNewsForApp({
    appid: 440,
    count: 3,
    maxlength: 300,
    callback: (err, data) => {
        console.log(data);
    }
});

steamSess.getAppList({
    callback: (err, data) => {
        console.log(data);
    }
});