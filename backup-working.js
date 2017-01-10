(function(console){

console.save = function(data, filename){

    if(!data) {
        console.error('Console.save: No data')
        return;
    }

    if(!filename) filename = 'console.json'

    if(typeof data === "object"){
        data = JSON.stringify(data, undefined, 4)
    }

    var blob = new Blob([data], {type: 'text/json'}),
        e    = document.createEvent('MouseEvents'),
        a    = document.createElement('a')

    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
 }
})(console)


function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}


//var lyrics = [
//    
//[
//{lyric:"In this spare room", time: 0},
//{lyric:"We better see what we have and whom", time: 7},
//{lyric:"An I.O.U. for the Same Thing", time: 13},
//{lyric:"Only angels have wings", time: 21},
//{lyric:"So they say", time: 25},
//{lyric:"Here I stand, alive unto you", time: 29},
//{lyric:"My fate's mercy seat", time: 37},
//{lyric:"Sought blood to gulp and flesh to eat", time: 45},
//{lyric:"And I can't blame you enough", time:52},
//{lyric:"But I'm indebted to your mercy and your love", time: 59},
//{lyric:"Here I stand, alive unto you, alive unto you", time: 67},
//{lyric:"Because you saved my life", time: 78},
//{lyric:"Now I see there's so much to lose so much to lose", time: 81},
//{lyric:"Because you saved my life", time: 90},
//{lyric:"My life, you saved my life", time: 94},
//{lyric:"Darling, now I must live for you", time: 107},
//{lyric:"One reprieve grants another until each world is born anew", time: 113},
//{lyric:"Here I stand, alive unto you, alive unto you", time: 137},
//{lyric:"Because you saved my life", time: 148},
//{lyric:"Now I see there's so much to lose, so much to lose", time: 151},
//{lyric:"Because you saved my life", time: 162},
//{lyric:"Here I stand, alive unto you, alive unto you", time: 164},
//{lyric:"Because you saved my life", time: 172},
//{lyric:"Now I see there's so much to lose, so much to lose", time: 176},
//{lyric:"Because you saved my life", time: 185},
//{lyric:"Never understand, never can ignore", time: 235},
//{lyric:"I'm rotten to the core, since 1994", time: 237},
//{lyric:"Never understand, never can ignore", time: 246},
//{lyric:"I'm rotten to the core, since 1994", time: 248}
//],      
//[
//{lyric:"This my excavation and to", time: 47},
//{lyric: "Day is Qumran", time: 56},
//{lyric:"Everything that happens is from now on", time: 67},
//{lyric:"This is pouring rain", time: 75},
//{lyric:"This is paralyzed", time: 78},
//{lyric:"I keep throwing it down, two", time: 98},
//{lyric:"Hundred at a time", time: 110},
//{lyric:"It's hard to find it when you knew it", time: 121},
//{lyric:"When your money's gone", time: 130},
//{lyric:"And you're drunk as hell", time: 133},
//{lyric:"On your back with your racks as he stacks your load", time: 151},
//{lyric:"In the back with the racks and he stacks your load", time: 159},
//{lyric:"In the back with the racks and you're unstacking your load", time: 167},
//{lyric:"I've been twisting to the sun", time: 176},
//{lyric:"I needed to replace", time: 185},
//{lyric:"And the fountain in the front yard is rusted out", time: 197},
//{lyric:"All my love was down", time: 205},
//{lyric:"In a frozen ground", time: 208},
//{lyric:"There's a black crow sitting across from me", time: 228},
//{lyric:"His wiry legs are crossed", time: 236},
//{lyric:"He's dangling my keys, he even fakes a toss", time: 250},
//{lyric:"Whatever could it be", time: 257},
//{lyric:"That has brought me to this loss?", time: 260},
//{lyric:"On your back with your racks as he stacks your load", time: 279},
//{lyric:"In the back with the racks and he stacks your load", time: 285},
//{lyric:"In the back with the racks and you're unstacking your load", time: 294},
//{lyric:"This is not the sound of a new man", time: 304},
//{lyric:"Or a crispy realization", time: 315},
//{lyric:"It's the sound of me unlocking and you lift away", time: 328},
//{lyric:"Your love will be", time: 336},
//{lyric:"Safe with me", time: 340}],  
//
//[
//{lyric:"If I can't be a man, tell me what I am?", time: 15},
//{lyric:"Tell me what I am", time: 18},    
//{lyric:"Tell me what I'm here for?", time: 19},
//{lyric:"If I can't be the one, tell her what I've done", time: 22},
//{lyric:"What good can I be?", time: 27},
//{lyric:"Did I not do enough to save the two of us?", time: 51},
//{lyric:"What more could I give her?", time: 55},
//{lyric:"What more could I do to see her point of view?", time: 59},
//{lyric:"Why can't I believe her?", time: 63},
//{lyric:"You got to make the change", time: 104},
//{lyric:"I can't take you no more", time: 107},
//{lyric:"These things you know", time: 112},
//{lyric:"Do go, oh, oh", time: 115},
//{lyric:"Oh, Jamelia", time: 117},
//{lyric:"You got to to go away", time: 122},
//{lyric:"And take time", time: 127},    
//{lyric:"Oh, oh", time: 131},
//{lyric:"You got to make the change", time: 137},
//{lyric:"I can't take you no more", time: 139},
//{lyric:"These things you know", time: 143},
//{lyric:"Do go, oh, oh", time: 148},
//{lyric:"Oh, Jamelia", time: 150},
//{lyric:"You got to to go away", time: 154},
//{lyric:"And take time", time: 159},   
//{lyric:"Oh, oh", time: 162},    
//{lyric:"You can't come", time: 197}
//],
//
//[
//{lyric:"Dream something and make it real", time: 1},
//{lyric:"Bring me my mount, bring me my steel", time: 9},
//{lyric:"Oh to be, to be, to be you", time: 19},
//{lyric:"To be, to be, to be you", time: 31},
//{lyric:"Now I’m the type of man who wants to watch the world burn", time: 41},
//{lyric:"I hope you run, best hope that I don’t find you first", time: 51},
//{lyric:"You know that I’m the worst", time: 62},
//{lyric:"When I come calling", time: 66},
//{lyric:"Best hope that I don’t find you first", time: 71},
//{lyric:"The whole world falling", time: 78},
//{lyric:"Down on you", time: 81},
//{lyric:"To be you", time: 85},
//{lyric:"Oh, it’s true", time: 91},
//{lyric:"I’m coming for you", time: 97},
//{lyric:"Now I’m the type of man who wants to watch the world burn", time: 103},
//{lyric:"And here I come, I know you’re gonna love my work", time: 112},
//{lyric:"You know that I’m the worst", time: 122},
//{lyric:"When I come calling", time: 127},
//{lyric:"Best hope that I don’t find you first", time: 132},
//{lyric:"The whole world falling on you", time: 139},
//{lyric:"I’ll be there too", time: 142},
//{lyric:"I’m picking through the bones to find you", time: 145},
//{lyric:"Give me your house, give me your things", time: 159},
//{lyric:"I’m in your head, I’m in your dreams", time: 169},
//{lyric:"I want your face, I want your skin", time: 179},
//{lyric:"I want your name, I want to live", time: 190},
//{lyric:"I want everything", time: 200},
//{lyric:"You know that I’m the worst", time: 202},
//{lyric:"When I come calling", time: 206},
//{lyric:"Best hope that I don’t find you first", time: 210},
//{lyric:"The whole world falling on you", time: 216},
//{lyric:"I’ll be there too", time: 220},
//{lyric:"I’m picking through the bones to find you", time: 223},
//{lyric:"Oh, to be, to be you", time: 230},
//{lyric:"To be, to be you", time: 238},
//{lyric:"To be, to be you", time: 242},
//{lyric:"To be", time: 248}
//]  
//    
//];
// Keep track of our socket connection

var socket;
//var songCount = ;
var songCount =  getUrlVars()["index"];
var percentile = {};  
var frame;
var categoryElement = [];
var mySong; 

p5.disableFriendlyErrors = true;

function preload(){  
   mySong = loadSound(songCount + '.mp3');               
}              
              
function setup() {   
  mySong.play();
  amplitude = new p5.Amplitude();    
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;    
  createCanvas(windowWidth, windowHeight);
  background(255); 
    
    
  socket = io.connect('http://localhost:8080/');
//    socket.on('lyricAnalyzed',
//    // When we receive data
//    function(data) {
//      console.log(data);
//      fill(200);
//      noStroke();
//      textSize(8);
//      if(data.score.comparative > .5 || data.score.comparative < -1 || data.score.score < -3){
//        text(data.lyric, xPos - 40, y - (data.score.score * 50) - 10)
//      }
//      
//      fill(0,209,153,100);
////      stroke(0,209,153,100);
//      
//      ellipse(xPos, y - (data.score.score * 50) ,4 + (10 * data.score.comparative), 4 + (10 * data.score.comparative));
//      xPos += 6;
//    }
//  );   
//    
    
  resetSketch();
}

var textLog = [];
var currentLyric;
var songCoordsLogged = false;


function checkTextUpdates(){
    return textLog;
}

function sendText(item, previous, time){
    textLog.push([item, previous, time]);
}


function sendLyric(item){
    currentLyric = item;
}


function draw() {
 var level = amplitude.getLevel(); 
 var size = map(level, 0, 1, 0, 100);
 var sizeback = map(level, 0, 1, 0, 20);    
background(255);    
 var sizeCirc = map(level, 0, 1, .1, 40);   
var pointSize = map(level, 0, 1, 2, 70);         
 for (var i=0; i<categoryElement.length; i++) {
    categoryElement[i].display(incrimentCount, size, sizeCirc, pointSize);
    categoryElement[i].update(incrimentCount, size, sizeCirc, pointSize);
  }   
    
}



var song = lyrics[0];
      var myLog = [];
      $.each(song, function (index, value) {
          myLog.push(value);
    });



function getLyric(lyric, time){
    setTimeout(function() {  
        socket.emit('lyric', {data: lyric, time: time});
    }, time * 100); 
}

var incrimentCount = 0;
var incrimentLyrics = 0;
var stateTracker = {};
var globalMouseover = false;
function createLIWCElement(category, xPos, yPos, diff, points, time, lyrics, actualPoints, color) {
    this.x = width * .8;
    this.y = 0;
    this.text = category;
    this.diff = diff;
    this.points = [];
    this.time = time;
    this.initY;
    this.hit = [];
    this.lyrics = lyrics;
    this.history = [];
    this.emphasize = false;
    this.actualPoints = actualPoints;
    this.highest = true;
    this.colors = color.replace('(', "").replace(')', "");
    this.color = this.colors.split(",");
    this.visualizationPoints = [];
    this.mouseOver = false;
    this.songOver = false;
    var that = this;
    var xoff = 0.0;
    
    actualPoints.forEach(function (entry){
        that.points.push(map(entry, 0, 100, height, 0));
    });
    

    
    
    this.update = function(index, amplitude){
        this.initY = this.points[index - 1] || height/2;
         var distanceToTravel = -this.initY + this.points[index];
         var framesUntil = this.time[index + 1] * 60;
         var framesDiff = this.diff[index + 1] * 60;
         var countDown = framesUntil - frameCount;
         if(countDown > 5 * 60){
//            countDown = 5 * 60; 
         } 
         var percentage = ((-countDown + framesDiff) / framesDiff) * 100;    
        
         var mapped = this.initY + map(percentage * (height/100), 0, height, 0, distanceToTravel);  
        
        
        var distanceToTravelAverage = -this.initY + this.actualPoints[this.actualPoints.length - 1];
        var mappedAverage = this.initY + map(percentage * (height/100), 0, height, 0, distanceToTravelAverage);

        
        if(map(this.actualPoints[index], 100, 0, 0, height) > 99){
            this.emphasize = true;
        }else{
            this.emphasize = false;
            if(frameCount % 8 === 0){
                this.history.push([this.x, this.y, frameCount]);
            }
            
        }

        
        
        
        if(frameCount < (this.time[index + 1]) * 60){
            this.y = mapped;
            if (stateTracker[category] == undefined){
                stateTracker[category] = {};
            }
            stateTracker[category]["yPos"] = this.y;
        }else{
            if(frameCount < (this.time[points.length - 1]) * 60){
                incrimentCount++;  
            }else{
                this.songOver = true;
                this.y = map(this.actualPoints[this.actualPoints.length - 1], 0, 100, height, 0);
                stateTracker[category].points = this.visualizationPoints;
            }
        }
          
    }
    


    
    
    this.display = function(index, amplitude, minAmp, pointSize){
        
            if (stateTracker[category] == undefined){
                stateTracker[category] = {};
            }


            if(stateTracker[category]["selected"] == undefined){
                stateTracker[category]["selected"] = false;
            }
        
            if(stateTracker[category]["color"] == undefined){
                stateTracker[category]["color"] = this.color;
            }
            
            if(stateTracker[category]["lyrics"] == undefined){
                stateTracker[category]["lyrics"] = [this.lyrics, this.time];
            }
        
            if(!this.mouseOver){
                stateTracker[category]["selected"] = false;
            }else{
                stateTracker[category]["selected"] = true;
            }   
        

        var emphasize = this.emphasize ? 2 : 1;
        tabOpacity = map(this.y, -(height/2), height, 255, 0);
        textAlign(LEFT);
        
        this.mouseOver = collidePointRect(mouseX,mouseY,this.x - 5,this.y - 11,100 ,14);
        
        noFill();
        
        

if(this.emphasize){
    strokeWeight(1.25);    
    stroke(this.color[0], this.color[1], this.color[2], 35);}
else{
    strokeWeight(2);    
    stroke(this.color[0], this.color[1], this.color[2], 150);
}


        
        beginShape();
         for (var i=0; i < this.history.length; i++){
             var increase = frameCount - (this.time[this.points.length - 1] * 60);
            var percentageCompleted = ((increase/ (this.time[this.points.length - 1] * 60) * 100) + 100);
             
             var percentageCompletedAdjusted = ((increase/ ((this.time[this.points.length - 1] * 60) - (this.time[0] * 60)) * 100) + 100); 
            
            var moveDown = map(this.history[i][2], 0, this.time[this.points.length - 1] * 60, 2, 10);
             

             
          if( this.history[i][0] > (width / 2) * (percentageCompletedAdjusted / 100)){
            this.history[i][0] += (random(-.5 * minAmp, .5 * minAmp)) - 1.75;
            this.history[i][1] += (random(-.5 * minAmp,.5 * minAmp));  
          }
            else{ 
          
            if(frameCount % 2 === 0){    
                this.visualizationPoints.push([this.history[i][0], this.history[i][1], 1, 1, pointSize]); 
            }
            this.history.splice(i, 1);      
          }
            
        }
        
    if(!this.songOver){
        for (var i=0; i < this.history.length; i++){
           var histOpacity = floor(map(i,  0, 100, 0, this.history.length / 5)); 

            curveVertex(this.history[i][0], this.history[i][1]);

        }
    }
        endShape();
        
        
        
        
        
        noStroke(); 
        fill(this.color[0], this.color[1], this.color[2], 75);

    var log = [];    
    for( var k in stateTracker) {
        if(stateTracker[k]["selected"]){
            log.push(true);
        }
    };
        
    if(log.length){       
        if(stateTracker[category]["selected"]){
            for (var i=0; i < this.visualizationPoints.length; i++){        
                 ellipse(this.visualizationPoints[i][0], this.visualizationPoints[i][1], this.visualizationPoints[i][2] * this.visualizationPoints[i][4], this.visualizationPoints[i][3] * this.visualizationPoints[i][4]);
            }
        }
    }else{
    if(!this.emphasize || this.songOver){
         for (var i=0; i < this.visualizationPoints.length; i++){        
                 ellipse(this.visualizationPoints[i][0], this.visualizationPoints[i][1], this.visualizationPoints[i][2] * this.visualizationPoints[i][4], this.visualizationPoints[i][3] * this.visualizationPoints[i][4]);
            }
    }
    }
        

    if(this.emphasize){
        fill(this.color[0], this.color[1], this.color[2], tabOpacity / 2);
        rect(this.x - 5,this.y - 11,100 ,14);
        textSize(8);
    }else{
        fill(this.color[0], this.color[1], this.color[2]);
        rect(this.x - 12,this.y - 15, 140 ,22);
        textSize(11);
    }
    
    if(this.songOver){
        fill(this.color[0], this.color[1], this.color[2], tabOpacity / 2);
        rect(this.x - 5,this.y - 11,100 ,14);
        textSize(8);
    }        
        
    if(this.mouseOver){
        fill(this.color[0], this.color[1], this.color[2]);
        rect(this.x - 12,this.y - 15, 140 ,22);
    } 
        
        
        noStroke();
        fill('white');
        textFont("Avenir");
        
        text(category.replace("_", " "), this.x, this.y);
        
        
        
        textAlign(CENTER);
        fill('black');
        textSize(20);
        if(frameCount > this.time[0] * 60){
        var lyricWidth = textWidth(this.lyrics[index]) * 1.1;
            if(!this.songOver){    
              fill(255, 255, 255, 25);    
              rect(width/2 - lyricWidth/2, height/2 - 20, lyricWidth, 24);
              fill(100, 100, 100);    
              text(this.lyrics[index], width/2, height/2);
          }
        }
        if(this.history.length > 100){
            this.history.splice(0,1);
        }
        
        
        
        if(this.songOver){
            if(!songCoordsLogged){
                console.save(stateTracker);
                songCoordsLogged = true;
            }
        }
        
        
              

        
        
        
        
//        this.hit = true;
//        xoff = xoff + (.0017 * amplitude);
//        $.each(stateTracker, function(k, v) {
//            if(k != category){
//                this.hit = 
//collideRectRect(that.x - 5,that.y - 11,100,14, that.x - (random(-100, 100)),v,20,4);
//                
//                if(this.hit == true){
//                    if(that.x < .75 * width){
//                        that.x = noise(xoff) * width;
//                    }else if(that.x > width){
//                        that.x = width * .75;
//                    }
//                    
//                    
//                }                
//                
//            }
//            
//        });
        
    }
    
    
}



function mouseClicked(){

      $.each(song, function (index, value) {
        getLyric(myLog[index].lyric, myLog[index].time);
      });
    
//      console.log(stateTracker);
//    mySong.stop();
//    resetSketch();
//    mySong1.play();
//    mySong = loadSound('coins.mp3', mySong.play());
    
//     incrimentCount ++;
    
//    resetSketch();
      

    
}


function resetSketch(){

         
  $.each(cached[songCount], function(k, v) {

      
      if(k != 'netspeak_focus' && k != 'food_focus' && k != 'type_a' && k != 'reward_bias' && k != 'leisure_oriented' && k!= 'thinking_style'){           
     categoryElement.push(new createLIWCElement(k, 50, height/2, v.diff, v.ave, v.time, v.lyrics, v.points, v.color));         
             }   
  });

              


      
  var xPos = 50;    
 
    
 var index = 0;
          
function add(a, b) {
    return a + b;
}
    socket.on('lyric',
    // When we receive data
    function(data) {  
      var scores = data.data.receptiviti_scores.percentiles;
      var lyric = data.lyric.data;
      var time = data.lyric.time;    
      var m; 
          
    sendLyric(lyric);
      
       
      $.each(scores, function(k, v) {
          if (percentile[k] == undefined || percentile[k].length == 0){  
            percentile[k] = {points: [v], time: [time], diff: [diff || time], ave: [], lyrics: [lyric]}; 
          }else{         
            percentile[k].points.push(v);  
            percentile[k].time.push(time);
            percentile[k].lyrics.push(lyric);
              
            switch(k) {
                case "body_focus":
                    percentile[k].color = '(255,13,128)';
                    break;
                case "conscientious":
                    percentile[k].color = '(154,103,38)';
                    break;
                case "family_oriented":
                    percentile[k].color = '(228,188,75)';
                    break;      
                case "neuroticism":
                    percentile[k].color = '(64,0,0)';
                    break;    
                case "social_skills":
                    percentile[k].color = '(84,50,95)';
                    break;      
                case "openness":
                    percentile[k].color = '(255,97,56)';
                    break;
                 case "cold":
                    percentile[k].color = '(8,21,75)';
                    break;     
                case "sexual_focus":
                    percentile[k].color = '(242,56,90)';
                    break; 
                case "religion_oriented":
                    percentile[k].color = '(208,168,37)';
                    break;     
                case "happiness":
                    percentile[k].color = '(255,225,26)';
                    break; 
                case "depression":
                    percentile[k].color = '(55,65,64)';
                    break;     
                case "agreeable":
                    percentile[k].color = '(52,136,153)';
                    break;
                case "independent":
                    percentile[k].color = '(217,0,0)';
                    break;     
                case "workhorse":
                    percentile[k].color = '(73,63,11)';
                    break;
                case "insecure":
                    percentile[k].color = '(145,145,176)';
                    break;     
                case "impulsive":
                    percentile[k].color = '(255,255,93)';
                    break;
                case "power_driven":
                    percentile[k].color = '(76,27,27)';
                    break;     
                case "health_oriented":
                    percentile[k].color = '(190,219,57)';
                    break;
                case "power_driven":
                    percentile[k].color = '(76,27,27)';
                    break;     
                case "work_oriented":
                    percentile[k].color = '(89,82,65)';
                    break;
                case "persuasive":
                    percentile[k].color = '(145,17, 70)';
                    break;
                case "adjusted":
                    percentile[k].color = '(41,217,194)';
                    break;
                case "extraversion":
                    percentile[k].color = '(212,215,230)';
                    break;
                default:
                    percentile[k].color = '(100,100,100)';
            }  
              
              
              
            var diff = percentile[k].time[percentile[k].time.length - 1] - percentile[k].time[percentile[k].time.length - 2]; 
            percentile[k].diff.push(diff);  
          }
          
          var sum = percentile[k].points.reduce(add, 0);
          var averaged = sum / percentile[k].points.length;
//          m = map(averaged, 0, 100, height, 0);
          percentile[k].ave.push(averaged);
          var category = k.replace("_", " ");
          var previousPoint = percentile[k].points[percentile[k].points.length - 1] || 0;
          var mappedPrevious = map(previousPoint, 0, 100, height, 0);
            sendText([category, 50, m], mappedPrevious, time);
          
      });
        index ++;
        console.log(index);
     if(index >= myLog.length){
         console.save(percentile);
        $.each(percentile, function(k, v) {
            console.log(k)
        });
     }
        
    }
  );   
}
