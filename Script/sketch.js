app.controller("p5Communication", function($scope, $rootScope, countService) {
 
function per(num, amount){
  return num*amount/100;
}   

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}    
    
var a = function(p) {    

var earlyLife;
var diagnosis;
var crisis;
var stillSurviving;
var earlyLifeRange;
var diagnosisRange;   
var crisisRange;
var stillSurvivingRange;
var earlyLifeContainer = 0; 
var diagnosisContainer = 0;
var crisisContainer = 0;
var stillSurvivingContainer = 0;    
var quoteLog = [];
var stageProgress = {};
var visWidth;
var visHeight;
var earlyRangePoints = [];
var diagnosisRangePoints = [];   
var crisisRangePoints = [];  
var survivingRangePoints = [];  
var lastReceived;
var averageMode = false;    
p.setup = function(){
    
    p.translate(100, 100);
    
    p.createCanvas(p.windowWidth, 1000);
    
    visWidth = p.windowWidth - 50;
    visHeight = 300;
    var decraments = {};
    var stages = [];
    $.each(lyrics[0], function (index, value) {
        if(value.stage){
            stages.push(value.stage);
        }
    });
    
    earlyLife = stages.filter(function(x){return x=="Early life"}).length;
    diagnosis = stages.filter(function(x){return x=="Diagnosis"}).length;
    crisis = stages.filter(function(x){return x=="Crisis"}).length;
    stillSurviving = stages.filter(function(x){return x=="Still surviving"}).length;
    var length = stages.length;
    
    
//    p.rect(0, 0, 600, visHeight);
    
    
    
//    var earlyLifeContainer = earlyLife / length;
//
//    p.rect(0, 0, earlyLifeContainer * visWidth, visHeight);
//    
//    var diagnosisContainer = diagnosis / length;
//    p.rect(earlyLifeContainer * visWidth, 0, diagnosisContainer * visWidth, visHeight);
//    
//    var crisisContainer = crisis / length;
//    p.rect((diagnosisContainer + earlyLifeContainer) * visWidth, 0, crisisContainer * visWidth, visHeight);
//    
//    var stillSurvivingContainer = stillSurviving / length;
//    p.rect((diagnosisContainer + earlyLifeContainer + crisisContainer) * visWidth, 0, stillSurvivingContainer * visWidth, visHeight);
    
//    earlyLifeRange = [0, earlyLifeContainer * visWidth];
//    diagnosisRange = [earlyLifeContainer * visWidth, earlyLifeRange[1] + diagnosisContainer * visWidth];
//    crisisRange = [(earlyLifeContainer + diagnosisContainer) * visWidth, diagnosisRange[1] + crisisContainer * visWidth];
//    stillSurvivingRange = [(earlyLifeContainer + diagnosisContainer + crisisContainer) * visWidth, crisisRange[1] + stillSurvivingContainer * visWidth];
    

    
    

        $rootScope.$on('quoteReceived', function (event, data) {
        if(data.stage.length){
            lastReceived = data.stage;
            if(stageProgress[data.stage] == undefined){
                stageProgress[data.stage] = 0;
            }
            
            stageProgress[data.stage]++;
            var stageRunningTotal = 0;
            for(var key in stageProgress){
                stageRunningTotal += stageProgress[key];
            }
            

            earlyLifeContainer = stageProgress['Early life'] / stageRunningTotal;
            
            
            diagnosisContainer = stageProgress['Diagnosis'] / stageRunningTotal;
            
            crisisContainer = stageProgress['Crisis'] / stageRunningTotal;
            
            stillSurvivingContainer = stageProgress['Still surviving'] / stageRunningTotal;
            
            
            earlyLifeContainer = earlyLifeContainer || 0;
            diagnosisContainer = diagnosisContainer || 0;
            crisisContainer = crisisContainer || 0;
            stillSurvivingContainer = stillSurvivingContainer || 0;
            
            earlyLifeRange = [0, earlyLifeContainer * visWidth];
            diagnosisRange = [earlyLifeContainer * visWidth, earlyLifeRange[1] + diagnosisContainer * visWidth];
            crisisRange = [(earlyLifeContainer + diagnosisContainer) * visWidth, diagnosisRange[1] + crisisContainer * visWidth];
            stillSurvivingRange = [(earlyLifeContainer + diagnosisContainer + crisisContainer) * visWidth, crisisRange[1] + stillSurvivingContainer * visWidth];
            
            
            if(data.stage === 'Early life'){
              earlyRangePoints.push({score:data.data.score, quote:data.quote, diff:data.diff, time:data.time, themes:data.theme});  
            }
            if(data.stage === 'Diagnosis'){
                diagnosisRangePoints.push({score:data.data.score, quote:data.quote, diff:data.diff, time:data.time, themes:data.theme});   
            }
            if(data.stage === 'Crisis'){
                crisisRangePoints.push({score:data.data.score, quote:data.quote, diff:data.diff, time:data.time, themes:data.theme}); 
                
            }
            
            if(data.stage === 'Still surviving'){                
                survivingRangePoints.push({score:data.data.score, quote:data.quote, diff:data.diff, time:data.time, themes:data.theme}); 
                
            }
            
        }
    });
    
    
    
};

var earlyAverage = 0;
var earlyAveragePoints = [];
var diagnosisAverage = 0;
var diagnosisAveragePoints = [];
var survivingAverage = 0;
var survivingAveragePoints = [];
var crisisAverage = 0;
var crisisAveragePoints = [];     
    
p.draw = function(){
    p.frameRate(60);
    p.background(255);
    p.noFill();
    earlyLifeContainer = earlyLifeContainer ? earlyLifeContainer : 0;
    diagnosisContainer = diagnosisContainer ? diagnosisContainer : 0;
    crisisContainer = crisisContainer ? crisisContainer : 0;
    stillSurvivingContainer = stillSurvivingContainer ? stillSurvivingContainer : 0;
    
    
    
    quoteLog = [];
    
    
    earlyRangePoints.forEach(function(item, index){ 
        if(index === earlyRangePoints.length - 1 && lastReceived == 'Early life'){
            
            if((((item.time + item.diff) / 1000) * 60)> p.frameCount){

                  var percentage = p.map(p.frameCount, (item.time / 1000) * 60, ((item.time + item.diff) / 1000) * 60, 0, 100);
                
            }
        }
            
            var y = p.map(item['score'], -10, 10, visHeight, 0);
            
            
            var spacing = earlyLifeRange[1] / (earlyRangePoints.length + 1);
            
        
            earlyAveragePoints.push(y);

            if(index == earlyRangePoints.length - 1){
                 earlyAverage = earlyAveragePoints.reduce(function(sum, a,i,ar) { sum += a;  return i==ar.length-1?(ar.length==0?0:sum/ar.length):sum},0);
                
            }
        
        if(averageMode == true){
            p.ellipse(spacing * (index + 1), earlyAverage, 10, 10);
        }else{
            p.ellipse(spacing * (index + 1), y, 10, 10);
        }
        
            
            
            quoteLog.push({x:spacing * (index + 1), y: y, quote:item.quote, themes: item.themes, time:item.time, stage:'early'});
    });
    
    
    
    
    diagnosisRangePoints.forEach(function(item, index){
            var y = p.map(item['score'], -10, 10, visHeight, 0);
            var spacing = (diagnosisRange[1] - diagnosisRange[0]) / (diagnosisRangePoints.length + 1);
        
            
            diagnosisAveragePoints.push(y);

            if(index == diagnosisRangePoints.length - 1){
                 diagnosisAverage = diagnosisAveragePoints.reduce(function(sum, a,i,ar) { sum += a;  return i==ar.length-1?(ar.length==0?0:sum/ar.length):sum},0);
                
            }
        
            if(averageMode == true){
                p.ellipse(spacing * (index + 1) + earlyLifeRange[1], diagnosisAverage, 10, 10);
                }else{
                p.ellipse(spacing * (index + 1) + earlyLifeRange[1], y, 10, 10);
            }
        
        
            quoteLog.push({x:spacing * (index + 1), y: y, quote:item.quote, themes: item.themes, time:item.time, stage:'diagnosis'});
    });
    
    crisisRangePoints.forEach(function(item, index){
            var y = p.map(item['score'], -10, 10, visHeight, 0);
            var spacing = (crisisRange[1] - crisisRange[0]) / (crisisRangePoints.length + 1);
        
            crisisAveragePoints.push(y);

            if(index == crisisRangePoints.length - 1){
                 crisisAverage = crisisAveragePoints.reduce(function(sum, a,i,ar) { sum += a;  return i==ar.length-1?(ar.length==0?0:sum/ar.length):sum},0);
                
            }
        
            if(averageMode == true){
                p.ellipse((spacing * (index + 1)) + diagnosisRange[1], crisisAverage, 10, 10);
                }else{
                p.ellipse((spacing * (index + 1)) + diagnosisRange[1], y, 10, 10);
            }
        
            quoteLog.push({x:spacing * (index + 1), y: y, quote:item.quote, themes: item.themes, time:item.time, stage:'crisis'});
    });
    
     survivingRangePoints.forEach(function(item, index){
            var y = p.map(item['score'], -10, 10, visHeight, 0);
            var spacing = (stillSurvivingRange[1] - stillSurvivingRange[0]) / (survivingRangePoints.length + 1);
         
            survivingAveragePoints.push(y);

            if(index == survivingRangePoints.length - 1){
                 survivingAverage = survivingAveragePoints.reduce(function(sum, a,i,ar) { sum += a;  return i==ar.length-1?(ar.length==0?0:sum/ar.length):sum},0);
                
            }
         
            if(averageMode == true){
                p.ellipse((spacing * (index + 1)) + crisisRange[1], survivingAverage, 10, 10);
                }else{
                p.ellipse((spacing * (index + 1)) + crisisRange[1], y, 10, 10);
            }
         
            quoteLog.push({x:spacing * (index + 1), y: y, quote:item.quote, themes: item.themes, time:item.time, stage:'surviving'});
    });

    p.fill(50);
    p.noStroke();
    p.textAlign(p.CENTER);
    p.textFont("Avenir");
    p.text('early life', (earlyLifeContainer * visWidth) / 2, visHeight + 20);
    p.textAlign(p.LEFT);
    p.text('average', 5, p.windowHeight - 20);
    p.textAlign(p.CENTER);
    p.fill(0,209,193);
    p.rect(0, visHeight - 5, earlyLifeContainer * visWidth, 5);
    
    
    
    p.fill(50);
    p.text('diagnosis', (earlyLifeContainer * visWidth) + ((diagnosisContainer * visWidth) / 2), visHeight + 20);
    p.fill(123,0,81);
    p.rect(earlyLifeContainer * visWidth, visHeight - 5, diagnosisContainer * visWidth, 5);
    
    
    p.fill(50);
    p.text('crisis', ((diagnosisContainer + earlyLifeContainer) * visWidth) + (crisisContainer * (visWidth/2)), visHeight + 20);
    p.fill(255,180,0);
    p.rect((diagnosisContainer + earlyLifeContainer) * visWidth, visHeight - 5, crisisContainer * visWidth, 5);
    
    
    
    p.fill(50);
    p.text('surviving', ((diagnosisContainer + earlyLifeContainer + crisisContainer) * visWidth) + ((stillSurvivingContainer * visWidth) / 2), visHeight + 20);
    p.fill(255,170,145);
    p.rect((diagnosisContainer + earlyLifeContainer + crisisContainer) * visWidth, visHeight - 5, stillSurvivingContainer * visWidth, 5);
    
//    p.strokeWeight(2);
//    p.stroke(120);
//    var interviewPercentage = p.map(p.frameCount, 0, 14000000, 0, visWidth);
//    console.log(interviewPercentage);
//    p.line(0, visHeight - 7, visWidth * interviewPercentage, visHeight - 7);
//    p.strokeWeight(1);
//    p.noStroke();
    
    
    
    
    
    
    hit = false;
    $rootScope.displayDescription = 0;
    $rootScope.showDescription = false;
    quoteLog.forEach(function(item){
        if(item.stage === 'diagnosis'){
            item.x += earlyLifeContainer * visWidth;
        }else if(item.stage === 'crisis'){
            item.x += (earlyLifeContainer + diagnosisContainer) * visWidth;
        }else if(item.stage === 'surviving'){
          item.x += (earlyLifeContainer + diagnosisContainer + crisisContainer) * visWidth;  
        } 
        
        var dist = p.dist(p.mouseX,p.mouseY,item.x,item.y);
        if(dist < 10){
            $rootScope.displayDescription--;
            $rootScope.$broadcast('quoteMarkerHover', {quote: item.quote});
            item.themes.forEach(function(i,index){
                p.fill(50);
                p.textAlign(p.CENTER);
                p.text(i,item.x,item.y + ((index + 1) * 19));
            });
            p.fill(120);
            p.textAlign(p.CENTER);
            p.text(millisToMinutesAndSeconds(item.time), item.x,item.y - 12);

            $rootScope.$apply();
        }else{
            $rootScope.displayDescription++;
            $rootScope.$apply();
        }
    });
    if($rootScope.displayDescription - quoteLog.length < 0){
        $rootScope.showDescription = true;
    }else{
        $rootScope.showDescription = false;
    };
    $rootScope.displayDescription = 0;
    $rootScope.$apply();
    p.stroke(0);
    
    
    earlyHit = false;
    var dist = p.dist(p.mouseX,p.mouseY,5, p.windowHeight - 20);
    if(dist < 30){
        averageMode = true;
    }else{
        averageMode = false;
    }
    
};

};

$.each(lyrics[0], function (index, value) {
    var m = parseInt((value.start.substring(0, 2) * 60)*1000);
    var s = parseInt((value.start.substring(3, 5))*1000);
    var mil = parseInt(value.start.substring(6, 8) / 1000);
    var time = m + s + mil;
    var quote = value.quote.replace(/\[.*?\]/g, "");
    
    var calcDifference;
    
//    if(index != 0){
//        lyrics[0][index]['diff'] = (lyrics[0][index - 1]['diff']) ;   
//    }else{
//        lyrics[0][index]['diff'] = 0;
//    }
    lyrics[0][index]['diff'] = time;
    
    setTimeout(function(){
         getQuoteData(quote, time, value.stage, value.overwrite, lyrics[0][index]['diff'], value.themes, index);
    },100);
   
    
});


    

function getQuoteData(quote, time, stage, overwrite, difference, themes, index){
    var diff = 0;
    if(index != 0 && index != lyrics[0].length - 1){
        diff = lyrics[0][index + 1]['diff'] - lyrics[0][index]['diff'];
    }else{
        diff = lyrics[0][index]['diff'];
    }
    
    setTimeout(function() {  
        $rootScope.sendData(quote, overwrite, stage, diff, time, themes);
    }, (time * 1) / 10); 
}

var myp5 = new p5(a);     
    
});