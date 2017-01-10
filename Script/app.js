var app = angular.module("sampleApp", ["firebase", "ngAnimate"]);

var $document = $(document);  
var divsize = ((Math.random()*100) + 50).toFixed(); 
var posx = function(){
    return (Math.random() * ($document.width() - divsize)).toFixed();
}

var posy = function(){
    return (Math.random() * ($document.height() - divsize)).toFixed(); 
} 

app.controller("SampleCtrl", function($scope, $firebaseArray) {
  var ref = new Firebase("https://speak-to-me.firebaseio.com/messages");

    
    
$scope.words = [];    
    
    var thesaurus = function (word){
         $.ajax({
            url: 'http://words.bighugelabs.com/api/2/06bae4c3abdd7c186cc1caaa46bc930e/'+ word +'/json',
            dataType: 'json',
            success: function(result) {
              if(result.noun){
                $scope.words = result.noun.syn;
                $scope.$apply();
              }else{
                if(result.adjective){
                    $scope.words = result.adjective.syn;
                    $scope.$apply();
                }
              }         
            }
          });
    }  
    
  
    var sentiment = function (word){
         $.ajax({
            type: "POST", 
            url: '/api/text',
            dataType: 'text',
            data: {
                data: word
            }, 
            success: function(result) {
              $scope.color = '(' + JSON.parse(result).color[0]["_rgb"].toString() + ')';
  
                
              var words = JSON.parse(result).data["words"][0];
              if (words){

              }
                
            }
          });
    }  
        
    
    

  // create a synchronized array
  $scope.messages = $firebaseArray(ref);


    // make position sensitive to size and document's width
 
  $scope.getStyle = function(index){     
    return {
      'z-index': -index,
      'top': posx(),
      'left': posy(),
      'opacity': .4
    }
  };

    

//    
// if (annyang) {
//    // Let's define our first command. First the text we expect, and then the function it should call
//
//    var sayThis = function(repeat) {
//      $('.text').text(repeat);
//        $scope.messages.$add({
//          text: repeat
//        }); 
//        
//        sentiment(repeat);
//        socket.emit('annyang',repeat);
//  }
//
//    var commands = {
//          '*repeat': sayThis
//    };
//
//    // Add our commands to annyang
//    annyang.addCommands(commands);
//
//    // Start listening. You can call this here, or attach this call to an event, button, etc.
//    annyang.start();
//     
//    annyang.addCallback('start', function() {
////      $('.text').text('listening');
//    }); 
//     
//}      
 
    
    
});


