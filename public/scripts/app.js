var app = angular.module('Stopwatch', [
    'ui.router',
    'ui.bootstrap'
]);

app.config(
    function ($stateProvider) {
        $stateProvider
            .state('main', {
                url: "",
                templateUrl: "../views/main.html"
            })
    }
);

