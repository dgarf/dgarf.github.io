 var width = 300;    // We will scale the photo width to this
  var height = 300;     // This will be computed based on the input stream

  var streaming = false;
  var video = null;
  var canvas = null;
  var photo = null;
  var startbutton = null;

//$(document).ready(function(){
	//startup();

//});

function get_photo(){
	startup();
	
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(function(stream) {
        video.srcObject = stream;
        video.play();
    })
    .catch(function(err) {
        console.log("An error occured! " + err);
    });

    video.addEventListener('canplay', function(ev){
      if (!streaming) {
      
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);

    startbutton.addEventListener('click', function(ev){
      takepicture();
      ev.preventDefault();
    }, false);
};

function startup(){
	video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    photo = document.getElementById('photo');
    startbutton = document.getElementById('startbutton');

    clearphoto();
};

function clearphoto() {
    var context = canvas.getContext('2d');
    context.fillStyle = "#ff69b4";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }

function takepicture() {
	console.log("took photo");
    var context = canvas.getContext('2d');
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
      var data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);
    } else {
      clearphoto();
    }
  }
