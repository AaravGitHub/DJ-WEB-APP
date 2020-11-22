song="";
LeftWristY=0;
LeftWristX=0;
RightWristY=0;
RightWristX=0;
scoreLeftWrist=0;
scoreRightWrist=0;
function setup()
{
canvas=createCanvas(600,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotPoses);
}

function modelLoaded()
{
console.log("poseNet is initialized");

}

function draw()
{
image(video,0,0,600,500);
stroke("#FF0000");
fill("#FF0000");

if(scoreRightWrist>0.2)
{
circle(RightWristX,RightWristY,20);
if(RightWristY>0 && RightWristY<=100)
{
document.getElementById("speed").innerHTML="speed= 0.5x";
song.rate(0.5);
}
else if(RightWristY>100 && RightWristY<=200)
{
    document.getElementById("speed").innerHTML="speed= 1x";
    song.rate(1);

}
else if(RightWristY>200 && RightWristY<=300)
{
    document.getElementById("speed").innerHTML="speed= 1.5x";
    song.rate(1.5);

}
else if(RightWristY>300 && RightWristY<=400)
{
    document.getElementById("speed").innerHTML="speed= 2x";
    song.rate(2);

}
else if(RightWristY>400 && RightWristY<=500)
{
    document.getElementById("speed").innerHTML="speed= 2.5x";
    song.rate(2.5);

}
}
if(scoreLeftWrist>0.2)
{
    circle(LeftWristX,LeftWristY,20);
    changetonumber=Number(LeftWristY);
    removeDecimals=floor(changetonumber);
    volume=removeDecimals/500;
    document.getElementById("volume").innerHTML="volume: "+volume;
    song.setVolume(volume);
}

}
function play()
{
song.play();
song.setVolume(1);
song.rate(1);
} 
function preload()
{
song=loadSound("music.mp3");
}

function gotPoses(results)
{
if(results.length>0)
{
console.log(results);
scoreRightWrist=results[0].pose.keypoints[10].score;
scoreLeftWrist=results[0].pose.keypoints[9].score;
console.log("scoreRightWrist= "+scoreRightWrist+"scoreLeftWrist= "+scoreLeftWrist);
LeftWristY=results[0].pose.leftWrist.y;
RightWristY=results[0].pose.rightWrist.y;
console.log("LeftWristY= "+LeftWristY+"RightWristY= "+RightWristY);
LeftWristX=results[0].pose.leftWrist.x;
RightWristX=results[0].pose.rightWrist.x;
console.log("LeftWristX= "+LeftWristX+"RightWristX= "+RightWristX);
}

}