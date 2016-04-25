var app = angular.module('Stopwatch', [
    'ui.router'
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

