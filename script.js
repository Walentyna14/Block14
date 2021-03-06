var image, canvas, ctx, topLineText, bottomLineText, stroke, fill;

var main = function(){
	image = new Image();
	image.src = 'tlo.png';
	prepareDOMEvents();
	topLineText = "";
	bottomLineText = "";
}
$(document).ready(main);


var prepareDOMEvents = function(){
	$('.style').change(changeStyle);
	$('.text').change(changeText);
	$('#file').change(handleFileSelect);
	$('button').click(saveFile);
	image.onload = imageLoad;
};

var imageLoad = function() {
	window.imageSrc = this;
	redrawMeme();
}

var changeStyle = function(){
	stroke = $('#strokeStyle').val();
	fill = $('#fillStyle').val();
	redrawMeme();
}

var changeText = function(){
	topLineText = $('#topLineText').val();
	bottomLineText = $('#bottomLineText').val();
	redrawMeme();
}


function redrawMeme() {
	// Get Canvas2DContext
	var canvas = document.querySelector('canvas');
	var ctx = canvas.getContext("2d");
	if (image != null)
		ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
	
	// Text attributes
	ctx.font = '25px Impact';
	ctx.textAlign = 'center';
	ctx.strokeStyle = stroke;
	ctx.fillStyle = fill;
	
	if (topLineText != null) {
		ctx.fillText(topLineText, canvas.width / 2, 40);
		ctx.strokeText(topLineText, canvas.width / 2, 40);
	}
	
	if (bottomLineText != null) {
		ctx.fillText(bottomLineText, canvas.width / 2, canvas.height - 20);
		ctx.strokeText(bottomLineText, canvas.width / 2, canvas.height - 20);
	}
}

function saveFile() {
	window.open(document.querySelector('canvas').toDataURL());
}

function handleFileSelect(evt) {
	var file = evt.target.files[0];
	var reader = new FileReader();
	reader.onload = function(fileObject) {
		var data = fileObject.target.result;
		image.src = data;
	};
	reader.readAsDataURL(file)
}