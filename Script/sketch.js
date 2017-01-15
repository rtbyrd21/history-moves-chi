app.controller("p5Communication", function($scope, $rootScope, countService) {
 
function per(num, amount){
  return num*amount/100;
}   

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
    
function hmsToSecondsOnly(str) {
    var p = str.split(':'),
        s = 0, m = 1;

    while (p.length > 0) {
        s += m * parseInt(p.pop(), 10);
        m *= 60;
    }

    return s;
}

var colors = {
    "family" : [136,168,37],
    "violence": [53,32,59],
    "house": [145,17,70],
    "neighborhood": [207,74,48],
    "poverty": [237,140,43],
    "addiction": [74,217,217],
    "stigma": [242,56,90],
    "system": [247,233,103]
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
var pressToPlayPos = [];    
var filters = [];
var circleOpacity = 150;

p.preload = function() {
//  interview = p.loadSound('Carol.mp3');
}
    
    
    
p.setup = function(){
    
//    interview.play();
    interview = p.loadSound('Carol.mp3');
    
    p.translate(100, 100);
    
    p.createCanvas(p.windowWidth * .75, 1000);
    
    visWidth = (p.windowWidth * .75);
    visHeight = 300;
    var decraments = {};
    var stages = [];
    var subThemes = [];
    $.each(lyrics[0], function (index, value) {
        if(value.stage){
            stages.push(value.stage);
        }
        if(value.subThemes.length){
            subThemes = $.unique($.merge(subThemes, value.subThemes));
        }
    });

    $rootScope.subThemes = $.unique(subThemes);
    $rootScope.$apply();

    earlyLife = stages.filter(function(x){return x=="Early life"}).length;
    diagnosis = stages.filter(function(x){return x=="Diagnosis"}).length;
    crisis = stages.filter(function(x){return x=="Crisis"}).length;
    stillSurviving = stages.filter(function(x){return x=="Still surviving"}).length;
    var length = stages.length;
    
    

    

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
              earlyRangePoints.push({score:data.data.score, quote:data.quote, diff:data.diff, time:data.time, themes:data.theme, images: data.images, subThemes: data.subThemes});  
            }
            if(data.stage === 'Diagnosis'){
                diagnosisRangePoints.push({score:data.data.score, quote:data.quote, diff:data.diff, time:data.time, themes:data.theme, images: data.images, subThemes: data.subThemes});   
            }
            if(data.stage === 'Crisis'){
                crisisRangePoints.push({score:data.data.score, quote:data.quote, diff:data.diff, time:data.time, themes:data.theme, images: data.images, subThemes: data.subThemes}); 
                
            }
            
            if(data.stage === 'Still surviving'){                
                survivingRangePoints.push({score:data.data.score, quote:data.quote, diff:data.diff, time:data.time, themes:data.theme, images: data.images, subThemes: data.subThemes}); 
                
            }
            
        }
    });


    $rootScope.$on('toggleFilter', function (event, data) {

        if(filters.indexOf(data.filter) > -1){
            filters.splice(filters.indexOf(data.filter), 1);
        }else{
           filters.push(data.filter); 

        }   
    }); 

    $rootScope.$on('clearFilters', function(){
        filters = [];
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
    
    p.stroke(190);
    p.line(0, visHeight/2, visWidth, visHeight/2);
    p.fill(125);
    p.text('20', 20, 20);
    p.text('0', 0, 0);
    p.text('-20', 20, visHeight - 20);
    p.stroke(50);
    p.fill(255);
    earlyRangePoints.forEach(function(item, index){ 
        

        if(index === earlyRangePoints.length - 1 && lastReceived == 'Early life'){
            
            if((((item.time + item.diff) / 1000) * 60)> p.frameCount){

                  var percentage = p.map(p.frameCount, (item.time / 1000) * 60, ((item.time + item.diff) / 1000) * 60, 0, 100);
                
            }
        }
            
            var y = p.map(item['score'], -20, 20, visHeight, 0);
            
            
            var spacing = earlyLifeRange[1] / (earlyRangePoints.length + 1);
            
        
            earlyAveragePoints.push(y);

            if(index == earlyRangePoints.length - 1){
                 earlyAverage = earlyAveragePoints.reduce(function(sum, a,i,ar) { sum += a;  return i==ar.length-1?(ar.length==0?0:sum/ar.length):sum},0);
                
            }
        
        

       
            var matchingFilters = [];
             item.themes.forEach(function(i, kIndex){
                filters.forEach(function(f, iIndex){
                    if(i === f){
                        matchingFilters.push(i);
                    }
                });
            });

            
            
            quoteLog.push({x:spacing * (index + 1), y: y, quote:item.quote, themes: item.themes, time:item.time, stage:'early', images:item.images, filters: matchingFilters, subThemes: item.subThemes});

            matchingFilters.forEach(function(i, iIndex){
                p.fill(colors[i][0], colors[i][1], colors[i][2], circleOpacity);
                p.ellipse(spacing * (index + 1), y, 10 + ((matchingFilters.length - iIndex) + 1) * 7, 10 + ((matchingFilters.length - iIndex) + 1) * 7);
            });


            p.fill(255);


            if(averageMode == true){
                p.ellipse(spacing * (index + 1), earlyAverage, 10, 10);
            }else{
                if(pressToPlayPos.length && pressToPlayPos[1] === spacing * (index + 1)){
                        p.triangle(spacing * (index + 1) - 5, y - 5, 
                                   spacing * (index + 1) - 5, y + 5, 
                                   spacing * (index + 1) + 4, y);
                    }else{
                        p.ellipse(spacing * (index + 1), y, 10, 10);
                    }
            }
        
            
    });
    
    
    
    
    diagnosisRangePoints.forEach(function(item, index){
            var y = p.map(item['score'], -20, 20, visHeight, 0);
            var spacing = (diagnosisRange[1] - diagnosisRange[0]) / (diagnosisRangePoints.length + 1);
        
            
            diagnosisAveragePoints.push(y);

            if(index == diagnosisRangePoints.length - 1){
                 diagnosisAverage = diagnosisAveragePoints.reduce(function(sum, a,i,ar) { sum += a;  return i==ar.length-1?(ar.length==0?0:sum/ar.length):sum},0);
                
            }
        
            var matchingFilters = [];
             item.themes.forEach(function(i, kIndex){
                filters.forEach(function(f, iIndex){
                    if(i === f){
                        matchingFilters.push(i);
                    }
                });
            });
        
        
            quoteLog.push({x:spacing * (index + 1), y: y, quote:item.quote, themes: item.themes, time:item.time, stage:'diagnosis', images:item.images, filters: matchingFilters, subThemes: item.subThemes});
    
            matchingFilters.forEach(function(i, iIndex){
                p.fill(colors[i][0], colors[i][1], colors[i][2], circleOpacity);
                p.ellipse(spacing * (index + 1) + earlyLifeRange[1], y, 10 + ((matchingFilters.length - iIndex) + 1) * 7, 10 + ((matchingFilters.length - iIndex) + 1) * 7);
            });


            p.fill(255);


            if(averageMode == true){
                p.ellipse(spacing * (index + 1) + earlyLifeRange[1], diagnosisAverage, 10, 10);
                }else{
                    if(pressToPlayPos.length && pressToPlayPos[1] === spacing * (index + 1)){
                    p.triangle(spacing * (index + 1) + earlyLifeRange[1] - 5, y - 5, 
                               spacing * (index + 1) + earlyLifeRange[1] - 5, y + 5, 
                               spacing * (index + 1) + earlyLifeRange[1] + 4, y);
                    }else{
                         p.ellipse(spacing * (index + 1) + earlyLifeRange[1], y, 10, 10);
                    }
            }



    });
    
    crisisRangePoints.forEach(function(item, index){
            var y = p.map(item['score'], -20, 20, visHeight, 0);
            var spacing = (crisisRange[1] - crisisRange[0]) / (crisisRangePoints.length + 1);
        
            crisisAveragePoints.push(y);

            if(index == crisisRangePoints.length - 1){
                 crisisAverage = crisisAveragePoints.reduce(function(sum, a,i,ar) { sum += a;  return i==ar.length-1?(ar.length==0?0:sum/ar.length):sum},0);
                
            }

            var matchingFilters = [];
             item.themes.forEach(function(i, kIndex){
                filters.forEach(function(f, iIndex){
                    if(i === f){
                        matchingFilters.push(i);
                    }
                });
            });
            
            
        
            quoteLog.push({x:spacing * (index + 1), y: y, quote:item.quote, themes: item.themes, time:item.time, stage:'crisis', images:item.images, filters: matchingFilters, subThemes: item.subThemes});
    

            matchingFilters.forEach(function(i, iIndex){
                p.fill(colors[i][0], colors[i][1], colors[i][2], circleOpacity);
                p.ellipse((spacing * (index + 1)) + diagnosisRange[1], y, 10 + ((matchingFilters.length - iIndex) + 1) * 7, 10 + ((matchingFilters.length - iIndex) + 1) * 7);
            });


            p.fill(255);

            if(averageMode == true){
                p.ellipse((spacing * (index + 1)) + diagnosisRange[1], crisisAverage, 10, 10);
                }else{
                    
                if(pressToPlayPos.length && pressToPlayPos[1] === spacing * (index + 1)){
                    p.triangle((spacing * (index + 1)) + diagnosisRange[1] - 5, y - 5, 
                               (spacing * (index + 1)) + diagnosisRange[1] - 5, y + 5, 
                               (spacing * (index + 1)) + diagnosisRange[1] + 4, y);
                    }else{
                         p.ellipse((spacing * (index + 1)) + diagnosisRange[1], y, 10, 10);
                    }    
            }

    });
    
     survivingRangePoints.forEach(function(item, index){
            var y = p.map(item['score'], -20, 20, visHeight, 0);
            var spacing = (stillSurvivingRange[1] - stillSurvivingRange[0]) / (survivingRangePoints.length + 1);
         
            survivingAveragePoints.push(y);

            if(index == survivingRangePoints.length - 1){
                 survivingAverage = survivingAveragePoints.reduce(function(sum, a,i,ar) { sum += a;  return i==ar.length-1?(ar.length==0?0:sum/ar.length):sum},0);
                
            }

            var matchingFilters = [];
             item.themes.forEach(function(i, kIndex){
                filters.forEach(function(f, iIndex){
                    if(i === f){
                        matchingFilters.push(i);
                    }
                });
            });
         

         
            quoteLog.push({x:spacing * (index + 1), y: y, quote:item.quote, themes: item.themes, time:item.time, stage:'surviving', images:item.images, filters: matchingFilters, subThemes: item.subThemes});
    

            matchingFilters.forEach(function(i, iIndex){
                p.fill(colors[i][0], colors[i][1], colors[i][2], circleOpacity);
                p.ellipse((spacing * (index + 1)) + crisisRange[1], y, 10 + ((matchingFilters.length - iIndex) + 1) * 7, 10 + ((matchingFilters.length - iIndex) + 1) * 7);
            });


            p.fill(255);


            if(averageMode == true){
                p.ellipse((spacing * (index + 1)) + crisisRange[1], survivingAverage, 10, 10);
                }else{
                  if(pressToPlayPos.length && pressToPlayPos[1] === spacing * (index + 1)){
                    p.triangle((spacing * (index + 1)) + crisisRange[1] - 5, y - 5, 
                               (spacing * (index + 1)) + crisisRange[1] - 5, y + 5, 
                               (spacing * (index + 1)) + crisisRange[1] + 4, y);
                    }else{
                          p.ellipse((spacing * (index + 1)) + crisisRange[1], y, 10, 10);
                    }     
            }

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
    quoteLog.forEach(function(item, index){
        var playX = item.x;
        if(item.stage === 'diagnosis'){
            item.x += earlyLifeContainer * visWidth;
        }else if(item.stage === 'crisis'){
            item.x += (earlyLifeContainer + diagnosisContainer) * visWidth;
        }else if(item.stage === 'surviving'){
          item.x += (earlyLifeContainer + diagnosisContainer + crisisContainer) * visWidth;  
        } 
        
        var dist = p.dist(p.mouseX,p.mouseY,item.x,item.y);
        if(dist < 10){
            pressToPlayPos = [index, playX, item.y];
            $rootScope.displayDescription--;
            $rootScope.$broadcast('quoteMarkerHover', {quote: item.quote, images: item.images});
            $rootScope.$broadcast('subThemes', {subThemes: item.subThemes, stage:item.stage});
            item.themes.forEach(function(i,index){
                p.fill(50);
                p.textAlign(p.CENTER);
                p.text(i,item.x,item.y + ((index + 1) * 19));
            });
            p.fill(120);
            p.textAlign(p.CENTER);
            p.text(millisToMinutesAndSeconds(item.time), item.x,item.y - 12);
            
            if(p.mouseIsPressed){
                interview.jump(hmsToSecondsOnly(millisToMinutesAndSeconds(item.time)));
            }
            
            
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
        pressToPlayPos = [];
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
         getQuoteData(quote, time, value.stage, value.overwrite, lyrics[0][index]['diff'], value.themes,
                      value.images, value.subThemes, index);
    },100);
   
    
});


    

function getQuoteData(quote, time, stage, overwrite, difference, themes, images, subThemes, index){
    var diff = 0;
    if(index != 0 && index != lyrics[0].length - 1){
        diff = lyrics[0][index + 1]['diff'] - lyrics[0][index]['diff'];
    }else{
        diff = lyrics[0][index]['diff'];
    }

    setTimeout(function() {  
        $rootScope.sendData(quote, overwrite, stage, diff, time, themes, images, subThemes);
    }, (time * 1) / 100); 
}

var myp5 = new p5(a);     
    
});