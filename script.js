var image;

var main = function(){
	image = new Image();
	image.src = 'tlo.png';
	prepareDOMEvents();
	window.topLineText = "";
	window.bottomLineText = "";
}
$(document).ready(main);


var prepareDOMEvents = function(){
	$('input').change(change);
	$('#file').change(handleFileSelect);
	$('button').click(saveFile);
	image.onload = imageLoad;
};

var imageLoad = function() {
	window.imageSrc = this;
	redrawMeme(window.imageSrc, null, null);
}

var change = function(){
	var topLineText, bottomLineText, stroke, fill;
	topLineText = $('#topLineText').val();
	bottomLineText = $('#bottomLineText').val();
	stroke = $('#strokeStyle').val();
	fill = $('#fillStyle').val();
	
	redrawMeme(window.imageSrc, topLineText, bottomLineText, stroke, fill );
}

function redrawMeme(image, topLine, bottomLine, stroke, fill) {
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
	
	if (topLine != null) {
		ctx.fillText(topLine, canvas.width / 2, 40);
		ctx.strokeText(topLine, canvas.width / 2, 40);
	}
	
	if (bottomLine != null) {
		ctx.fillText(bottomLine, canvas.width / 2, canvas.height - 20);
		ctx.strokeText(bottomLine, canvas.width / 2, canvas.height - 20);
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