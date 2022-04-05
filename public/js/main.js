WsSubber.subscribe('ws', 'open', function () {
    WsSubber.send('yrk', 'first_connect', {
        'name': 'Trinitas Overlay',
        'version': '0.1a'
    });
    setInterval(function () {
        WsSubber.send('yrk', 'heartbeat', 'heartbeat');
    }, 1000);
});

WsSubber.init('localhost', 49122, false, [
    'game:update_state',
    'yrk:heartbeat'
]);

WsSubber.subscribe('game', 'update_state', (d) => {
    //Display Score on Scoreboard
    YrkOverlay.displayScore(
        d.game.teams[0].score, 
        d.game.teams[1].score
    );

    //Display clock on Scoreboard
    YrkOverlay.displayClock(
        d.game.time_seconds, 
        d.game.time_milliseconds, 
        d.game.isOT
    );

    if (d.game.hasTarget) {
        // Set targethud to display
        if ($('.targethud').css('display') === 'none') {
            $('.targethud').css('display', 'block');
        }

        // Set data of targethud elements
        YrkOverlay.displayPlayer(
            d.players[d.game.target]
        );
    }
    else {
        if ($('.targethud').css('display') === 'block') {
            $('.targethud').css('display', 'none');
        }
    }
});