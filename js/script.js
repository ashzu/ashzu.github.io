/*Copyright Takunda Ashleigh Zuweni*/
$(function () {

	$('.modal-trigger').leanModal();

	$('.start-btn').click(function() {
		$('.start-div').fadeOut(500, function() {
			$('body').css('background', 'black');
			$('.game').show();
			gameTimer();
		});
	});

var baddy = document.querySelector(".b1");
var baddy2 = document.querySelector(".b2");
var baddy3 = document.querySelector(".b3");
var baddy4 = document.querySelector(".b4");
var baddy5 = document.querySelector(".b5");
var baddy6 = document.querySelector(".b6");
var baddy7 = document.querySelector(".b7");
var baddy8 = document.querySelector(".b8");
var baddy9 = document.querySelector(".b9");
var baddy10 = document.querySelector(".b10");
var angle = 0 , lastTime = null ;

/*Function animates Baddies*/
function animate(time) {
    if ( lastTime != null )
        angle += ( time - lastTime ) * 0.001;
        lastTime = time ;
        baddy.style.top = (Math.sin(angle) * 20) + "px";
        baddy.style.left = (Math.cos(angle) * 640) + "px";
        baddy2.style.top = (Math.sin(angle) * 20) + "px";
        baddy2.style.left = (Math.cos(angle) * 300) + "px";
        baddy3.style.top = (Math.sin(angle) * 20) + "px";
        baddy3.style.left = (Math.cos(angle) * 480) + "px";
        baddy4.style.top = (Math.sin(angle) * 20) + "px";
        baddy4.style.left = (Math.cos(angle) * 560) + "px";
        baddy5.style.top = (Math.sin(angle) * 20) + "px";
        baddy5.style.left = (Math.cos(angle) * 730) + "px";
        baddy6.style.top = (Math.sin(angle) * 20) + "px";
        baddy6.style.left = (Math.cos(angle) * 600) + "px";
        baddy7.style.top = (Math.sin(angle) * 20) + "px";
        baddy7.style.left = (Math.cos(angle) * 440) + "px";
        baddy8.style.top = (Math.sin(angle) * 20) + "px";
        baddy8.style.left = (Math.cos(angle) * 330) + "px";
        baddy9.style.top = (Math.sin(angle) * 20) + "px";
        baddy9.style.left = (Math.cos(angle) * 400) + "px";
        baddy10.style.top = (Math.sin(angle) * 20) + "px";
        baddy10.style.left = (Math.cos(angle) * 700) + "px";
        requestAnimationFrame(animate);
}

/*Function Initializes Animation*/
function initAnimation(m) {
    requestAnimationFrame(m);
}


//Initialize Baddy Animation
initAnimation(animate);

//Progress bar showing Number of Baddies Murdered!
var killed = 0;
var total_baddies = 10;//Number of badies in game-matrix div
var bar = document.querySelector(".progress-bar div");
var percent = 0;
bar.style.width;


$('.baddy').click(function () {

//Explode Baddy
$(this).hide('explode', {pieces: 30}, 500, function () {
//$('#win-modal').click();
});

killed++;
increaseProgressBar(killed);

});

/*When a baddy is killed baddy killed progress bar is updated*/
function increaseProgressBar(i) {
  percent = (i / total_baddies) * 100;

bar.style.width = percent + "%";

if(bar.style.width == "25%") {	
	$('.progress-bar').css('border','1px solid #e91e63');
	$('.progress-bar > div').css('background', '#e91e63');
}

if(bar.style.width == "50%") {
	$('.progress-bar').css('border','1px solid #673ab7');
	$('.progress-bar > div').css('background', '#673ab7');
}

if(bar.style.width == "75%") {
	$('.progress-bar').css('border','1px solid #0288d1');
	$('.progress-bar > div').css('background', '#0288d1');
}

if(bar.style.width == "100%") {
	clearTimeout();
	$('.baddies-progress').html('You Killed all the Baddies!');
	$('.progress-bar').css('border','1px solid green');
	$('.progress-bar > div').css('background', 'green');
	$('.game').delay(1000).fadeOut(500, function () {
		$('.end-div').show();
		$('.end-div').html('<h5 class="center white-text">Right on! You killed all the Badies</h5><p class="center"><a href="index.html" class"btn waves-effect waves-white red-text">Play again</a></p>')
	});
}

}

//Progress bar showing time remaining!
var bar2 = document.querySelector(".time-progress-bar div");
var percent2 = 100;

bar2.style.width = percent2 + "%";


/*Game Timer function*/
function gameTimer() {

	var clock = setInterval ( function () {
	percent2-= 100/60;
	bar2.style.width = percent2 + "%";
	if(percent2 <= 50) {
    $('.time-progress-bar').css('border','1px solid #e3530d');
	$('.time-progress-bar > div').css('background', '#e3530d');
	}
	if(percent2 <= 25) {
    $('.time-progress-bar').css('border','1px solid red');
	$('.time-progress-bar > div').css('background', 'red');
	}
if ( percent2 == 0) {
clearInterval(clock);
}
}, 1000);

	var timer = setTimeout ( function () {
$('.game').hide();
$('.end-div').fadeIn(200);
$('.end-div').html('<h5 class="center white-text"><img src="images/baddy.png" height="80"><br><br>You failed to kill all the Badies in time.</h5><p class="center"><a href="index.html" class"btn waves-effect waves-white red-text">Try Harder</a></p>');
} , 60000) ;

}


});



