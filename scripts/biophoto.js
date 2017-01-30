 var width = 500;    // We will scale the photo width to this
  var height = 500;     // This will be computed based on the input stream

  var streaming = false;
  var video = null;
  var canvas = null;
  var photo = null;
  var startbutton = null;
  var context = null;
  var stamp = null;

$(document).ready(function(){
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
       // height = video.videoHeight/(video.videoWidth/width);

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
});
	

function startup(){
	video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    photo = document.getElementById('photo');
    startbutton = document.getElementById('startbutton');

    clearphoto();
};

function clearphoto() {
    var context = canvas.getContext('2d');
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, 500, 500);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }

function takepicture() {
     context = canvas.getContext('2d');
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      stamppicture();

      var data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);
    } else {
      clearphoto();
    }
  }

  function stamppicture(){
    context.font = "36px Helvetica";
    context.fillStyle = "#ff69b4";
    context.textAlign = "center";

    // Create gradient
    var gradient=context.createLinearGradient(0,0,canvas.width,0);
    gradient.addColorStop("0","magenta");
    gradient.addColorStop("0.5","pink");
    gradient.addColorStop("1.0","yellow");
    // Fill with gradient
    context.fillStyle=gradient;

    context.fillText("hello from sunny internet!", canvas.width/2, canvas.height/2)
      

  };
