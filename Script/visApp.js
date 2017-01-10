var app = angular.module("visApp", ['ngAnimate']);

app.controller("VisualizationCtrl", function($scope, $rootScope, $timeout, $http) {
    
      $rootScope.sendData = function (quote, words, stage, difference, time, themes) {
            var data = {data: quote,
                       overwrite: words,
                       stage: stage,
                       diff: difference,
                       time: time,
                       themes: themes};    
            $http.post('/api/text', data)
            .success(function (data, status, headers, config) {
                $rootScope.$broadcast('quoteReceived', data);
            })
            .error(function (data, status, header, config) {
                console.log("Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config);
            });
        };
    
    
        $rootScope.$on('quoteMarkerHover', function(event, data){
            $scope.nodeSelected = data.quote;
        });
    
    
    
});