app.controller('MainController',
    function ($scope,
        $interval) {

        var _laps = [];
        var interval;


        // //////////////////////////////////////////
        // Init scope vars
        // //////////////////////////////////////////

        $scope.timerOn          = false;
        $scope.currentFormatted = '00:00';
        $scope.laps             = null;
        $scope.lapsCount        = 0;
        $scope.showLaps         = false;
        $scope.showAverageLaps  = false;




        // //////////////////////////////////////////
        // Scope functions
        // //////////////////////////////////////////

        $scope.start = function () {
            $scope.timerOn = true;
            if ($scope.current === undefined) {
                $scope.current = (new Date).getTime();
                $scope.initial = (new Date).getTime();
                updateTimer(true)
            }
        };


        $scope.stop = function () {
            $scope.timerOn = false;
        };


        $scope.lap = function () {
            // calculate lap time
            var prevLap = _laps[_laps.length - 1];
            var lapTime = Math.abs(prevLap.time - $scope.current);

           // store the lap 
            var currLap = {
                time: $scope.current,
                deltaMs: lapTime,
                deltaMsString: parseMs(lapTime)
            };
            _laps.push(currLap);
            $scope.lapsCount = _laps.length;
           
            // update average lap
            if($scope.showAverageLaps === true){
                $scope.getAverageLap();
            }
        };


        $scope.reset = function () {
            $scope.timerOff         = false;
            $scope.laps             = false;
            $scope.showLaps         = false;
            $scope.showAverageLaps  = false;

            $scope.current          = $scope.initial = undefined;
            $scope.currentFormatted = '00:00';
            $scope.currentFormatted = '00:00';
            $scope.lapsCount        = 0;
            _laps                   = [];
            $scope.averageLap       = undefined;
            
            if($scope.timerOn){
                return $scope.start();
            }
        };

        // $scope.getTime = function () { };

        $scope.getLaps = function () {
            $scope.laps = _laps;
            $scope.showLaps = true;
        };


        $scope.hideLaps= function () {
            $scope.showLaps = false;
        };


        $scope.getAverageLap = function () {
            var sum = 0;
            _laps.forEach(function (lap) {
                sum += lap.deltaMs
            });
            
            if (sum === 0) {
                $scope.averageLap = "00:00";
            } else {
                var lapCount = $scope.lapsCount-1;
                $scope.averageLap = parseMs(sum / lapCount);
            }
            
            $scope.showAverageLaps = true;

        };


        $scope.$watch('timerOn', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if (newValue) {
                    interval = $interval(updateTimer, 1000);

                } else {
                    stopTimer();
                }
            }
        });


        // //////////////////////////////////////////
        // Helper functions
        // //////////////////////////////////////////


        function updateTimer(isInitial) {
            if (isInitial !== true) { $scope.current += 1000; }
            
            var diff                = $scope.current - $scope.initial;
            $scope.currentFormatted = parseMs(diff);
            
            if (isInitial === true) {
                _laps.push({time: $scope.current, deltaMs: 0, deltaMsString: '00:00'});
            }
        }


        function parseMs(ms) {
            var seconds = Math.floor(ms / 1000);
            var minutes = Math.floor(seconds / 60);
            seconds     = formatTime(seconds, 2);
            minutes     = formatTime(minutes, 2);

            return minutes + ":" + seconds;
        }

        function formatTime(number, digits) {
            number = number % 60;
            return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;

        }

        function stopTimer() {
            if (angular.isDefined($scope.current)) {
                $interval.cancel(interval);
            }
        }

    }
);