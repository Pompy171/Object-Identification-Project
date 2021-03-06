status = false;
img = "";
obj = "";

function preload() {
    img = loadImage("solar_pannel.jpg");
}

function setup() {
    canvas = createCanvas(630, 420);
    canvas.center();

    object_detector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw() {
    image(img, 0, 0, 630, 420);

    if (status !="") {
        for (var i = 0; i < obj.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            var obj_name = obj[i].label;
            var obj_accuracy = floor(obj[i].confidence * 100);
            var x = obj[i].x;
            var y = obj[i].y;
            var width = obj[i].width;
            var height = obj[i].height;

            fill("red");
            text(obj_name + " " + obj_accuracy + " % ", x+15, y+15);
            noFill();
            stroke("red");
            rect(x, y, width, height);


        }
    }

}


function modelLoaded() {
    console.log("MODEL LOADED");

    status = true;
    object_detector.detect(img, gotResult);

}

function gotResult(error, results) {

    if (error == true) {
        console.error(error);
    }

        console.log(results);

        obj = results;

}

function back (){
    window.location="index.html";
}