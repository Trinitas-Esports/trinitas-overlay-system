const YrkOverlay = {
    state: 'none',
    displayScore: function (blueScore, orangeScore) {
        $('.score#blue').text(blueScore);
        $('.score#orange').text(orangeScore);
    },
    displayClock: function (sec, ms, isOT) {
        let posInString = (!isOT && sec < 60) ? 17 : 15;
        let time = (isOT ? '+' : '') +
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
    }
};