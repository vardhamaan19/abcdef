song="";

scoreleftwrist=0;
scorerightwrist=0;

leftwristX=0;
leftwristY=0;
rightwristX=0;
rightwristY=0;

function preload()
{
    song=loadSound("music.mp3");
}

function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    //video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw()
{
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreleftwrist>0.2){
        circle(leftwristX,leftwristY,20);
        innumberleftwristY=Number(leftwristY);
        remove_decimals=floor(innumberleftwristY);
        Volume=remove_decimals/500;
        document.getElementById("volume").innerHTML="volume:"+Volume;
        song.setVolume(Volume);
    }

if(scorerightwrist>0.2){

  circle(rightwristX,rightwristY,20);
  if(rightwristY>0 && rightwristY<=100){
    document.getElementById("speed").innerHTML="speed-0.5X";
    song.rate(0.5);
  }

else if(rightwristY>100 && rightwristY<=200){
    document.getElementById("speed").innerHTML="speed-1X";
    song.rate(1);
  }

  else if(rightwristY>100 && rightwristY<=300){
    document.getElementById("speed").innerHTML="speed-1.5X";
    song.rate(1.5);
  }

else if(rightwristY>300 && rightwristY<=400){
    document.getElementById("speed").innerHTML="speed-2X";
    song.rate(2);
  }

  else if(rightwristY>400 && rightwristY<=500){
    document.getElementById("speed").innerHTML="speed-2.5X";
    song.rate(2.5);
  }

}

}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results){
    if(results.length > 0) {
        console.log (results);
        scorerightwrist=results[0].pose.keypoints[10].score;
        scoreleftwrist=results[0].pose.keypoints[9].score;
        leftwristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftwristX="+leftwristX+"leftwristY="+leftwristY);
        rightwristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightwristX="+rightwristX+"rightwristY="+rightwristY);
        
    }
}