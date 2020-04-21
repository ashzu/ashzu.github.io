$(function() {

//Materialize Auto init
M.AutoInit();  

// Set constraints for the video stream
var constraints = { video: { facingMode: "environment" }, audio: false };
var track = null;

// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger");

// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Oops. Something is broken.", error);
        });
}

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    $("#camera--output").addClass('taken');
    $('#full-view').removeClass('hide');
    $('#cameraTrigger').addClass('hide');
    track.stop();
    app();
};

// Start the video stream when the window loads
//window.addEventListener("load", cameraStart, false);
cameraStart();

$('#another-pic').click(function(){
  $('#result-table').addClass('hide');
  $('#full-view').addClass('hide');
  $('#cameraTrigger').removeClass('hide');
  cameraStart();
});

//Upload Image
$('#file').change(function(){
  var image = document.getElementById('camera--output');
	image.src = URL.createObjectURL(event.target.files[0]);
	app();
});
 

let net;

async function app() {
  console.log('Loading mobilenet..');
  $('#message').text('Loading...');
  $('#result').html('');
  $('#result-table').addClass('hide');

  // Load the model.
  net = await mobilenet.load();
  console.log('Successfully loaded model');
  $('#message').text('Getting ready...');

  // Make a prediction through the model on our image.
  const imgEl = document.getElementById('camera--output');
  const result = await net.classify(imgEl);
  console.log(result);
  $('#message').text('');
  $('#result').html('');
  $('#result-table').removeClass('hide');
  for (let index = 0; index < result.length; index++) {
       $('#result').append('<tr><td>'+result[index].className+'</td><td>'+result[index].probability+'</td></tr>');
    }
}

// Install ServiceWorker
if ('serviceWorker' in navigator) {
  console.log('CLIENT: service worker registration in progress.');
  navigator.serviceWorker.register( '/what-breed/sw.js' , { scope : ' ' } ).then(function() {
    console.log('CLIENT: service worker registration complete.');
  }, function() {
    console.log('CLIENT: service worker registration failure.');
  });
} else {
  console.log('CLIENT: service worker is not supported.');
}



});//End JQuery Document Ready
