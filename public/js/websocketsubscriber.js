const WsSubber = {
    __subscribers: {},
    websocket: undefined,
    webSocketConnected: false,
    registerQueue: [],
    init: function (host, port, debug, debugFilter) {
        port = port || 49122;
        debug = debug || false;

        if (debug) {
            if (debugFilter !== undefined) {
                console.warn("WebSocket Debug Mode enabled with filtering.");
            }
            else {
                console.warn("WebSocket Debug Mode enabled without filters applied.")
            }
        }

        WsSubber.websocket = new WebSocket(`ws://${host}:${port}`);
        WsSubber.websocket.onmessage = function (e) {
            let jEvent = JSON.parse(e.data);
            
            if (!jEvent.hasOwnProperty('event')) {
                return;
            }

            let eventSplit = jEvent.event.split(':');
            let channel = eventSplit[0];
            let event = eventSplit[1];

            if (debug) {
                if (!debugFilter) {
                    console.log(channel, event, jEvent);
                }
                else if (debugFilter && debugFilter.indexOf(jEvent.event) < 0) {
                    console.log(channel, event, jEvent);
                }
            }

            WsSubber.triggerSubscribers(channel, event, jEvent.data);
        };

        WsSubber.websocket.onopen = function () {
            WsSubber.triggerSubscribers('ws', 'open');
            WsSubber.webSocketConnected = true;
            WsSubber.registerQueue.forEach((r) => {
                WsSubber.send('relay', 'register', r);
            });
            WsSubber.registerQueue = [];
        };
        
        WsSubber.websocket.onerror = function () {
            WsSubber.triggerSubscribers('ws', 'error');
            WsSubber.webSocketConnected = false;
        };

        WsSubber.onclose = function () {
            WsSubber.triggerSubscribers('ws', 'close');
            WsSubber.webSocketConnected = false;
        };
    },

    subscribe: function (channels, events, callback) {
        if (typeof channels === 'string') {
            let channel = channels;
            channels = [];
            channels.push(channel);
        }

        if (typeof events === 'string') {
            let event = events;
            events = [];
            events.push(event);
        }

        channels.forEach(function (c) {
            events.forEach(function (e) {
                if (!WsSubber.__subscribers.hasOwnProperty(c)) {
                    WsSubber.__subscribers[c] = {};
                }
                if (!WsSubber.__subscribers[c].hasOwnProperty(e)) {
                    WsSubber.__subscribers[c][e] = [];
                    if (WsSubber.webSocketConnected) {
                        WsSubber.send('relay', 'register', `${c}:${e}`);
                    }
                    else {
                        WsSubber.registerQueue.push(`${c}:${e}`);
                    }
                }

                WsSubber.__subscribers[c][e].push(callback);
            });
        });
    },

    clearEventCallbacks: function (channel, event) {
        if (WsSubber.__subscribers.hasOwnProperty(channel) && WsSubber.__subscribers[channel].hasOwnProperty(event)) {
            WsSubber.__subscribers[channel] = {};
        }
    },

    triggerSubscribers: function (channel, event, data) {
        if (WsSubber.__subscribers.hasOwnProperty(channel) && WsSubber.__subscribers[channel].hasOwnProperty(event)) {
            WsSubber.__subscribers[channel][event].forEach(function (callback) {
                if (callback instanceof Function) {
                    callback(data);
                }
            });
        }
    },

    send: function (channel, event, data) {
        if (typeof channel !== 'string') {
            console.error('Channel must be a string');
            return;
        }

        if (typeof event !== 'string') {
            console.error('Event must be a string');
            return;
        }

        if (channel === 'local') {
            this.triggerSubscribers(channel, event, data);
        }
        else {
            let cEvent = `${channel}:${event}`;
            WsSubber.websocket.send(JSON.stringify({
                'event': cEvent,
                'data': data
            }));
        }
    }
};