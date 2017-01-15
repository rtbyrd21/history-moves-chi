var app = angular.module("visApp", ['ngAnimate']);

app.controller("VisualizationCtrl", function($scope, $rootScope, $timeout, $http) {
    
      $rootScope.sendData = function (quote, words, stage, difference, time, themes, images, subThemes) {
            var data = {data: quote,
                       overwrite: words,
                       stage: stage,
                       diff: difference,
                       time: time,
                       themes: themes,
                       images: images,
                       subThemes: subThemes};    
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


function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


        $rootScope.colors = [
            ["family", "'" + rgbToHex(136,168,37) + "'"],
            ["violence", "'" + rgbToHex(53,32,59) + "'"],
            ["house", "'" + rgbToHex(145,17,70)+ "'"],
            ["neighborhood", "'" + rgbToHex(207,74,48)+ "'"],
            ["poverty", "'" + rgbToHex(237,140,43)+ "'"],
            ["addiction", "'" + rgbToHex(74,217,217)+ "'"],
            ["stigma", "'" + rgbToHex(242,56,90)+ "'"],
            ["system", "'" + rgbToHex(247,233,103)+ "'"],
            ["clear all", "'" + rgbToHex(100,100,100)+ "'"]
];


        $rootScope.stageColors = {
          'early' : '0,209,193',
          'diagnosis' : '123,0,81',
          'crisis' : '255,180,0',
          'surviving' : '255,170,145'
                  };

        $rootScope.filters = [];
    
        
        $rootScope.toggleFilter = function(i){
          if(i === 'clear all'){
            $rootScope.$broadcast('clearFilters');
            $rootScope.filters = [];
          }else{
            $rootScope.$broadcast('toggleFilter', {'filter':i});
            if($rootScope.filters.indexOf(i) === -1){
              $rootScope.filters.push(i);
            }else{
              $rootScope.filters.splice($rootScope.filters.indexOf(i), 1);
            }
          }
        }




        $rootScope.$on('quoteMarkerHover', function(event, data){
            $scope.nodeSelected = data.quote;
            if(data.images.length > 0){
                $scope.images = data.images[0];
            }else{
                $scope.images = '';
                $scope.$apply();
            }
            
        });

        $rootScope.$on('subThemes', function(event, data){
          $rootScope.relevantThemes = data.subThemes;
          $rootScope.subThemeColor = $rootScope.stageColors[data.stage];
          console.log($rootScope.subThemeColor);
          data.subThemes.forEach(function(i, index){
            $rootScope.subThemes.forEach(function(j, jIndex){
              if(i == j){
                $rootScope.subThemes.splice(jIndex, 1);
                $rootScope.subThemes.unshift(j);
                $rootScope.$apply();
              }
            });
          })
        });
    
    
    
});