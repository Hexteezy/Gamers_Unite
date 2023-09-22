const steam = require('steam-web');

const steamSess = new steam ({
    apiKey: '64FC0BC847B1CFB732205AF3CBCBFC75',
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