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
        $('.target#score').text(player.score);
        $('.target#goals').text(player.goals);
        $('.target#assists').text(player.assists);
        $('.target#saves').text(player.saves);
        $('.target#shots').text(player.shots);

        YrkOverlay.displayBoost(player.speed, player.boost);
    },
    displayBoost: function (speed, boost) {
        console.log(speed, boost);
    }
};