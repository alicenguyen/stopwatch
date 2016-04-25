app.factory(
    'StopWatchFactory',
    function () {

        var t0, t1;

        var laps = [];

        var factory = {

            start: function () {
                t0 = new Date();
            },

            stop: function () {
            },

            reset: function () {
            },

            getTime: function () {
            },

            getLaps: function () {
            },

            getAverageLap: function () {
            }
        };
        return factory;
    }
);