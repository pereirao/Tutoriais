var Discord = require('discord.io');
var fs = require('fs');
var auth = require('./auth.json');

var client = new Discord.Client({
    token: auth.token,
    autorun: true
});

var VCID = "1033229530401341560";
var song = "uepa.mp3";

client.on('ready', function () {
    console.log("%s (%s) ready", client.username, client.id);

    client.joinVoiceChannel(VCID, function (err, events) {
        if (err) return console.error(err);
        events.on('speaking', function (userID, SSRC, speakingBool) {
            console.log("%s is " + (speakingBool ? "now speaking" : "done speaking"), userID);
        });
        events.on('message', function (userID, SSRC, speakingBool) {
            console.log("%s is " + (speakingBool ? "now speaking" : "done speaking"), userID);
            client.getAudioContext(VCID, function (err, stream) {
                if (err) return console.error(err);
                fs.createReadStream(song).pipe(stream, { end: false });
                stream.on('done', function () {
                    fs.createReadStream(song).pipe(stream, { end: false });
                });
            });
        });
        client.getAudioContext(VCID, function (err, stream) {
            if (err) return console.error(err);
            fs.createReadStream(song).pipe(stream, { end: false });
            stream.on('done', function () {
                fs.createReadStream(song).pipe(stream, { end: false });
            });
        });
    });

});

