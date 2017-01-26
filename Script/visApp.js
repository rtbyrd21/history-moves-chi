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


function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};


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


var root;
var collapse;
var i = 0;
var duration = 750;
var margin = {top: 20, right: 120, bottom: 20, left: 120},
    width = 960 - margin.right - margin.left,
    height = 800 - margin.top - margin.bottom;

var tree = d3.layout.tree()
    .size([height, width]);

var diagonal = d3.svg.diagonal();    

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .attr("id", "tree")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var renderTree = function(myObj){


  
  


          root = myObj;
          root.x0 = height / 2;
          root.y0 = 0;

          collapse = function (d) {
            if (d.children) {
              d._children = d.children;
              d._children.forEach(collapse);
              d.children = null;
            }
          }

          root.children.forEach(collapse);
          update(root);  


          d3.select(self.frameElement).style("height", "800px");

          function update(source) {

          // Compute the new tree layout.
          var nodes = tree.nodes(root).reverse(),
              links = tree.links(nodes);

          // Normalize for fixed-depth.
          nodes.forEach(function(d) { d.y = d.depth * 80; });

          // Update the nodes…
          var node = svg.selectAll("g.node")
              .data(nodes, function(d) { return d.id || (d.id = ++i); });

          // Enter any new nodes at the parent's previous position.
          var nodeEnter = node.enter().append("g")
              .attr("class", "node")
              .attr("transform", function(d) { return "translate(" + source.x0 + "," + source.y0 + ")"; })
              .on("click", click);

          nodeEnter.append("circle")
              .attr("r", 1e-6)
              .style("fill", function(d) { 
                var color;
                $rootScope.colors.forEach(function(item,index){
                  if(item[0] == d.name){
                      color = item[1];
                  }
                });
                return d._children ? 'grey' : "#fff"; });

          nodeEnter.append("text")
              .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
              .attr("dy", ".35em")
              .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
              .text(function(d) { return d.name; })
              .style("fill-opacity", 1e-6);

          // Transition nodes to their new position.
          var nodeUpdate = node.transition()
              .duration(duration)
              .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

          nodeUpdate.select("circle")
              .attr("r", 4.5)
              .style("fill", function(d) { 
                var color;
                $rootScope.colors.forEach(function(item,index){
                  if(item[0] == d.name){
                      color = item[1];
                  }
                });
                return d._children ? color : "#fff"; 

              });

          nodeUpdate.select("text")
              .style("fill-opacity", 1);

          // Transition exiting nodes to the parent's new position.
          var nodeExit = node.exit().transition()
              .duration(duration)
              .attr("transform", function(d) { return "translate(" + source.x + "," + source.y + ")"; })
              .remove();

          nodeExit.select("circle")
              .attr("r", 1e-6);

          nodeExit.select("text")
              .style("fill-opacity", 1e-6);

          // Update the links…
          var link = svg.selectAll("path.link")
              .data(links, function(d) { return d.target.id; });

          // Enter any new links at the parent's previous position.
          link.enter().insert("path", "g")
              .attr("class", "link")
              .attr("d", function(d) {
                var o = {x: source.x0, y: source.y0};
                return diagonal({source: o, target: o});
              });

          // Transition links to their new position.
          link.transition()
              .duration(duration)
              .attr("d", diagonal);

          // Transition exiting nodes to the parent's new position.
          link.exit().transition()
              .duration(duration)
              .attr("d", function(d) {
                var o = {x: source.x, y: source.y};
                return diagonal({source: o, target: o});
              })
              .remove();

          // Stash the old positions for transition.
          nodes.forEach(function(d) {
            d.x0 = d.x;
            d.y0 = d.y;
          });
        }

        // Toggle children on click.
        function click(d) {
          if (d.children) {
            d._children = d.children;
            d.children = null;
          } else {
            d.children = d._children;
            d._children = null;
          }
          update(d);
        }

      }

      

      // myData = {
      //           "name": "Debra",
      //           "children": [
      //               {
      //                 "name": "Family",
      //                 "children": [
      //                   {"name": "Childhood sexual assault"},
      //                   {"name": "Childhood sexual assault"}
      //                 ]
      //               },
      //               {
      //                 "name": "Violence",
      //                 "children": [{
      //                   "name": "Childhood sexual assault"
      //                 }]
      //               }

      //           ],

      //       };

      myData = {
        "name": "Debra"
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
          if($('#tree').length === 0){

              myData.children = [];

              angular.forEach(data.subThemes, function(value, key) {
                var log = [];
                value.forEach(function(item, index){
                    log.push({'name': item});
                })

                var logObj = {};
                logObj.name = key;
                logObj.children = log;
                this.push(logObj);
              }, myData.children);


              renderTree(myData);
            }else{

              myData.children = [];

              angular.forEach(data.subThemes, function(value, key) {
                var log = [];
                value.forEach(function(item, index){
                    log.push({'name': item});
                })

                var logObj = {};
                logObj.name = key;
                logObj.children = log;
                this.push(logObj);
              }, myData.children);

              renderTree(myData);

              root = myData;  
              root.children.forEach(collapse);
              // update(myData);
            };


          $rootScope.relevantThemes = data.subThemes;
          $rootScope.subThemeColor = $rootScope.stageColors[data.stage];
          // data.subThemes.forEach(function(i, index){
          //   $rootScope.subThemes.forEach(function(j, jIndex){
          //     if(i == j){
          //       $rootScope.subThemes.splice(jIndex, 1);
          //       $rootScope.subThemes.unshift(j);
          //       $rootScope.$apply();
          //     }
          //   });
          // })
        });
    
    
    
});