const YrkOverlay = {
    state: {},
    displayScore: function (blueScore, orangeScore) {
        $('.score#blue').text(blueScore);
        $('.score#orange').text(orangeScore);
    },
    displayClock: function (sec, ms, isOT) {
        const posInString = (!isOT && sec < 60) ? 17 : 15;
        const time = (isOT ? '+' : '') +
                    (new Date(ms * 1000))
                        .toISOString()
                        .substring(posInString, posInString + 4);

        $('.clock.time#clock').text(time);
    },
    displayPlayer: function (player) {
        $('.target#name').text(player.name);
        $('.target#goals').text(player.goals);
        $('.target#assists').text(player.assists);
        $('.target#saves').text(player.saves);
        $('.target#shots').text(player.shots);

        YrkOverlay.displayBoost(player.speed, player.boost);
    },
    displayAdditionalPlayerinfo: function (player) {
        $('.additionalhud .target#score').text(player.score);
        $('.additionalhud .target#demos').text(player.demos);
        $('.additionalhud .target#touches').text(player.touches);
        $('.additionalhud .target#cartouches').text(player.cartouches);
    },
    displayBoost: function (speed, boost) {
        $('.boostmeter .target#speed').text(speed + ' kph');
        $('.boostmeter .target#boost').text(boost);
    },
    displayPlayerCams: function (player) {},
    playStinger: function (delay) {},
    setLocalStorage: function (key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    },
    getLocalStorageByKey: function (key) {
        try {
            YrkOverlay.state = JSON.parse(localStorage.getItem(key));
        }
        catch (e) {
            throw e;
        }
    },
    removeLocalStorageByKey: function (key) {
        if (localStorage.getItem(key) !== undefined) {
            localStorage.removeItem(key);
        }
    }
};